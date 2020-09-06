declare module '@capacitor/core' {
  interface PluginRegistry {
    Recorder: RecorderPlugin;
  }
}

export interface RecorderPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  initialize(options: { value: string }): Promise<{ value: string }>;
  record(options: { value: string }): Promise<{ value: string }>;
  play(options: { value: string }): Promise<{ value: string }>;
  export(options: { value: string }): Promise<{ value: string }>;
}
