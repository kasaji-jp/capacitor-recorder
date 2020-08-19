declare module '@capacitor/core' {
  interface PluginRegistry {
    Recorder: RecorderPlugin;
  }
}

export interface RecorderPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
