import { WebPlugin } from '@capacitor/core';
import { RecorderPlugin } from './definitions';

export class RecorderWeb extends WebPlugin implements RecorderPlugin {
  constructor() {
    super({
      name: 'Recorder',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async initialize(options: { value: string }): Promise<{ value: string }> {
    console.log('started');
    return options;
  }

  async record(options: { value: string }): Promise<{ value: string }> {
    console.log('started');
    return options;
  }

  async play(options: { value: string }): Promise<{ value: string }> {
    console.log('started');
    return options;
  }

  async export(options: { value: string }): Promise<{ value: string }> {
    console.log('started');
    return options;
  }
}

const Recorder = new RecorderWeb();

export { Recorder };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(Recorder);
