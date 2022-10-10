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

import { componentWrapperDecorator, Meta, Story } from '@storybook/angular';
import { VideoViewComponent } from './video-view.component';
import { FakeVideoSource } from '../../model/video/video-source.fake';

export default {
  title: 'Components/VideoView',
  component: VideoViewComponent,
} as Meta;

const Template: Story<VideoViewComponent> = (args: VideoViewComponent) => ({
  props: args,
});

export const NoInput = Template.bind({});
NoInput.args = {};

function constantSizeDecorator(width: number, height: number) {
  return componentWrapperDecorator(
    story => `<div style="border: 1px solid blue;
      width: ${width}px;
      height: ${height}px;
      display: flex;
      align-items: stretch;
      justify-content: stretch;
      overflow: hidden;">
      ${story}
      </div>`
  );
}

export const PortraitVideo = Template.bind({});
PortraitVideo.args = {
  source: new FakeVideoSource(300, 400),
};
PortraitVideo.decorators = [constantSizeDecorator(400, 500)];

export const PortraitVideoConstrainedWidth = Template.bind({});
PortraitVideoConstrainedWidth.args = {
  ...PortraitVideo.args,
};
PortraitVideoConstrainedWidth.decorators = [constantSizeDecorator(200, 500)];

export const PortraitVideoConstrainedHeight = Template.bind({});
PortraitVideoConstrainedHeight.args = {
  ...PortraitVideo.args,
};
PortraitVideoConstrainedHeight.decorators = [constantSizeDecorator(400, 300)];

export const LandscapeVideo = Template.bind({});
LandscapeVideo.args = {
  source: new FakeVideoSource(400, 300),
};
LandscapeVideo.decorators = [constantSizeDecorator(500, 400)];

export const LandscapeVideoConstrainedWidth = Template.bind({});
LandscapeVideoConstrainedWidth.args = {
  source: new FakeVideoSource(400, 300),
};
LandscapeVideoConstrainedWidth.decorators = [constantSizeDecorator(300, 500)];

export const LandscapeVideoConstrainedHeight = Template.bind({});
LandscapeVideoConstrainedHeight.args = {
  source: new FakeVideoSource(400, 300),
};
LandscapeVideoConstrainedHeight.decorators = [constantSizeDecorator(500, 200)];
