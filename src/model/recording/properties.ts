/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FrameSeries, FrameSeriesBuilder } from './frame-series';
import { motion } from '../../proto/storage';
import { ViewId, ViewIdFactory } from './view-id';
import Trace = motion.Trace;
import IViewNode = motion.IViewNode;

export class Properties {
  constructor(public readonly properties: ReadonlyArray<Property<unknown>>) {}

  query() : Property<unknown>[] {
    return [];
  }
}

export interface Property<T> {
  label: string;
  series: FrameSeries<T>;
  readonly selector: string;
}

export interface ViewProperty extends Property<number> {
  type: 'view-property';
  viewId: ViewId;
  propertyName: string;
}

export function transposeTrace(trace: Trace, viewIdFactory: ViewIdFactory): Properties {
  interface PropertyBuildInfo {
    builder: FrameSeriesBuilder<number>;
    viewId: ViewId;
    propertyName: string;
  }

  const propertyMap = new Map<string, PropertyBuildInfo>();
  const totalFrames = trace.frames.length;

  for (let i = 0; i < totalFrames; i++) {
    const frame = trace.frames[i];

    function processNumberProperty(viewId: ViewId, name: string, value: number | null | undefined) {
      if (value === undefined || value === null) return;
      const propertyKey = viewId.instanceKey + '#' + name;
      let info = propertyMap.get(propertyKey);
      if (!info) {
        info = {
          builder: FrameSeriesBuilder.createNumber(totalFrames),
          viewId: viewId,
          propertyName: name,
        };
        propertyMap.set(propertyKey, info);
      }
      info.builder.setValue(i, value);
    }

    function processNode(viewNode: IViewNode | null | undefined, path: IViewNode[]) {
      if (!viewNode) return;
      const viewId = viewIdFactory.viewIdOfNode(viewNode);

      processNumberProperty(viewId, 'left', viewNode.left);
      processNumberProperty(viewId, 'top', viewNode.top);
      processNumberProperty(viewId, 'width', viewNode.width);
      processNumberProperty(viewId, 'height', viewNode.height);
      processNumberProperty(viewId, 'scrollX', viewNode.scrollX);
      processNumberProperty(viewId, 'scrollY', viewNode.scrollY);

      processNumberProperty(viewId, 'translationX', viewNode.translationX);
      processNumberProperty(viewId, 'translationY', viewNode.translationY);
      processNumberProperty(viewId, 'scaleX', viewNode.scaleX);
      processNumberProperty(viewId, 'scaleY', viewNode.scaleY);
      processNumberProperty(viewId, 'alpha', viewNode.alpha);

      processNumberProperty(viewId, 'willNotDraw', viewNode.willNotDraw ? 1 : 0);
      processNumberProperty(viewId, 'clipChildren', viewNode.clipChildren ? 1 : 0);
      processNumberProperty(viewId, 'visibility', viewNode.visibility);

      processNumberProperty(viewId, 'elevation', viewNode.elevation);

      if (viewNode.children?.length) {
        const childPath = [...path, viewNode];
        for (const child of viewNode.children) {
          processNode(child, childPath);
        }
      }
    }

    processNode(frame.viewHierarchy, []);
  }

  const properties: Property<unknown>[] = [];

  for (const collectedData of propertyMap.values()) {
    const { viewId, propertyName } = collectedData;
    const label = `${viewId.label} ${propertyName}`;

    const selector ='sdfghjkl';

    const viewProperty: ViewProperty = {
      type: 'view-property',
      label,
      viewId,
      propertyName,
      selector,
      series: collectedData.builder.build(),
    };
  }

  return new Properties(properties);
}
