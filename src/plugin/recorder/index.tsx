import { createLogger, getExtFromMime } from "@/util";

interface RecordOptions {
  auto?: boolean;
}

interface FancyMediaRecorderConstraints {
  /** @desc 媒体流 constraints */
  media?: MediaStreamConstraints;
  /** @desc 录制器 constraints */
  recorder?: MediaRecorderOptions;
}

// ========== Constant ========== //
const defaultConstraints = {
  media: { video: true, audio: true },
  recorder: { mimeType: "video/webm;codecs=h264" },
};

class FancyMediaRecorder {
  private _classNameProperty: string = this.constructor.name;
  /**
   * @desc 是否支持 FancyMediaRecorder
   * @note 检测是否支持 mediaDevices 和 MediaRecorder APi
   */
  public isSupportRecorder: boolean;
  /** @desc 媒体设备 mediaDevices */
  public mediaDevices: MediaDevices;
  /** @desc getUserMedia constraints see https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints */
  public constraints: FancyMediaRecorderConstraints;
  /** @desc media stream */
  public stream: MediaStream;
  /** @desc recorder */
  public recorder: MediaRecorder;
  /** @desc media data */
  public chunks: Blob[] = [];
  /** @desc 日志打印器 */
  public logger = createLogger(this._classNameProperty);

  constructor(
    constraints: MediaStreamConstraints = {},
    options: RecordOptions
  ) {
    this.mediaDevices = globalThis.navigator.mediaDevices;
    // 检测是否支持 FancyMediaRecorder
    this.isSupportRecorder = !!this.mediaDevices && !!MediaRecorder;
    this.constraints = this._mergeConstraints(constraints);
  }

  /** @private 合并 constraints */
  private _mergeConstraints(
    c1: FancyMediaRecorderConstraints,
    c2 = defaultConstraints
  ): FancyMediaRecorderConstraints {
    return {
      media: Object.assign({}, c2.media, c1.media),
      recorder: Object.assign({}, c2.recorder, c1.recorder),
    };
  }

  /** @private 检查 FancyMediaRecorder 的支持情况 */
  private _precheck(): boolean {
    this.logger(
      this.isSupportRecorder,
      `your device not support ${this._classNameProperty}`,
      "error"
    );
    return this.isSupportRecorder;
  }

  /** @desc 当前 recorder 的状态 */
  public recordState(): RecordingState {
    return this.recorder?.state;
  }

  /** @desc recorder 是否已经开启 */
  public isStart(): boolean {
    return !!this.recorder;
  }

  /** @desc 是否正在录制 */
  public isRecording(): boolean {
    return this.recordState() === "recording";
  }

  /** @desc 是否正在录制 */
  public isPaused(): boolean {
    return this.recordState() === "paused";
  }

  /** @desc 初始化 stream 和 recorder 等 */
  public async init() {
    this.stream = await this.mediaDevices.getDisplayMedia(
      this.constraints.media
    );
    this.recorder = new MediaRecorder(this.stream, this.constraints.recorder);
    // 绑定录制事件
    this.recorder.ondataavailable = (e: BlobEvent) => this.chunks.push(e.data);
  }

  /** @desc 重置相关的状态和数据 */
  public reset() {
    this.stream = undefined;
    this.recorder = undefined;
    this.chunks = [];
  }

  /**
   * @desc 开始录制
   *
   */
  public async start() {
    if (!this._precheck())
      // 检查浏览器支持情况
      return false;
    // 开启录制前先初始化
    !this.isStart() && (await this.init());
    // 开启 recorder
    this.recorder.start();
    return this;
  }
  /** @desc 暂停录制 */
  public pause() {
    this.logger(
      this.isRecording(),
      "recorder not start yet, not recording current",
      "error"
    );
    if (!this.isRecording()) return false;
    // 关闭 recorder
    this.recorder.pause();
    return this;
  }

  /** @desc 继续录制 */
  public resume() {
    this.logger(this.isPaused(), "recorder not paused yet", "error");
    if (!this.isPaused()) return false;
    // 关闭 recorder
    this.recorder.resume();
    return this;
  }

  /** @desc 停止录制 */
  public stop() {
    this.logger(
      this.isStart(),
      "recorder not start yet, not recording current",
      "error"
    );
    if (!this.isStart()) return false;
    // 关闭 recorder
    this.recorder.stop();
    return this;
  }

  /** @desc 创建 Blob Url */
  public createUrl(): string {
    const blob = new Blob(this.chunks, { type: this.chunks[0].type });
    return globalThis.URL.createObjectURL(blob);
  }

  /** @desc 下载录制文件 */
  public download({ fileName }: { fileName: string } = {}) {
    const hasChunks = !!this.chunks.length;
    this.logger(hasChunks, "no chunks yet, try record something", "error");
    if (!hasChunks) return false;
    const fileType = getExtFromMime(this.constraints.recorder.mimeType);
    let aEle = document.createElement("a");
    aEle.href = this.createUrl();
    aEle.download = fileName
      ? `${fileName}.${fileType}`
      : `${new Date().getTime()}.${fileType}`;
    aEle.click();
    globalThis.URL.revokeObjectURL(aEle.href);
  }

  /** @desc 预览录制流 */
  public preview(videoNode: any) {
    setTimeout(() => (videoNode.srcObject = this.stream));
  }
}

export default FancyMediaRecorder;
