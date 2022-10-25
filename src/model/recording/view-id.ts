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

import { Disposable } from '../../utils/disposer';
import { checkNotNull } from '../../utils/preconditions';
import { motion } from '../../proto/storage';
import IViewNode = motion.IViewNode;

/** Identifies a view in the view hierarchy */
export interface ViewId {
  /**
   * A key assumed to be unique per view instance.
   *
   * NOTE: this assumption will likely work, however the uniqueness depends on the
   * `System.identityHashCode` function, which does NOT guarantee uniqueness.
   */
  readonly instanceKey: string;

  /**
   * Whether another ViewId matches the current one. A match is defined by the same
   * {classname, resourceId}. Note that there could be multiple matches in a view hierarchy.
   *
   * Consider using `ViewPath` to identify a view in a hierarchy.
   */
  matches(other: ViewId): boolean;

  readonly label: string;
}

/** A hierarchical location of a view. */
export interface ViewPath {
  matches(other: ViewPath): boolean;
}

export class ViewIdFactory implements Disposable {
  private _cache? = new Map<string, ViewIdImpl>();

  viewId(classname: string, hash: number, resourceId: string | undefined): ViewId {
    const cache = checkNotNull(this._cache, 'ViewIdFactory was already disposed');
    const key = classname + '@' + hash.toString(16);

    let viewId = cache.get(key);
    if (!viewId) {
      viewId = new ViewIdImpl(key, classname, hash, resourceId);
      cache.set(key, viewId);
    }

    return viewId;
  }

  viewIdOfNode(node: IViewNode): ViewId {
    const classname = checkNotNull(node.classname);
    const hash = checkNotNull(node.hashcode);
    const resourceId = node.id !== null ? node.id : undefined;
    return this.viewId(classname, hash, resourceId);
  }

  dispose(): void {
    this._cache = undefined;
  }
}

class ViewIdImpl implements ViewId {
  constructor(
    public readonly instanceKey: string,
    readonly classname: string,
    readonly hash: number,
    readonly resourceId: string | undefined
  ) {}

  matches(other: ViewId): boolean {
    if (other instanceof ViewIdImpl) {
      return this.classname == other.classname && this.resourceId == other.resourceId;
    }
    return false;
  }

  private _cachedLabel?: string;
  get label(): string {
    if (!this._cachedLabel) {
      // there is either a last `.`, in which case the extraction starts from the next character,
      // or there is none, in which case lastIndexOf returns -1, and the +1 ensures this copies the
      // whole string;
      const simpleClassName = this.classname.substring(this.classname.lastIndexOf('.') + 1);
      this._cachedLabel = this.resourceId
        ? `${simpleClassName}@id/${this.resourceId}`
        : simpleClassName;
    }
    return this._cachedLabel;
  }
}
