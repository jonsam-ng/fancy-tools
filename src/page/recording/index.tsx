import { useState, useRef, useEffect } from "react";
import {
  Select,
  CheckBox,
  Button,
  CircleButton,
  SquareButton,
} from "@/component";
import { useI18n } from "@/i18n";
import { FancyMediaRecorder } from "@/plugin";
import config from "./config";

const START = Symbol(0);
const WAITING = Symbol(1);
const RECORDING = Symbol(2);
const END = Symbol(3);
const { autoRecordTimeout, autoDownloadAfterStopRecord } = config;

type RecordStatus = START | WAITING | RECORDING | END;

const { Option } = Select;
const RecordingPage = () => {
  const { t, lang } = useI18n();

  // ========== State ========== //
  /** @desc 是否开启自动录制 */
  const [autoRecord, setAutoRecord] = useState(false);
  /** @desc 录制的状态 */
  const [status, setStatus] = useState<RecordStatus>(START);
  /** @desc 是否暂停录制 */
  const [pauseRecord, setPauseRecord] = useState(false);
  /** @desc 当前的 recorder 实例 */
  const recorder = useRef<FancyMediaRecorder | null>(null);
  /** @desc 预览视频的 video ref */
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ========== Handler ========== //
  /** @desc 处理开始共享屏幕 */
  const onShareScreen = async () => {
    // 根据 recorder 配置生成 recorder 实例
    recorder.current = new FancyMediaRecorder();
    // 初始化 recorder
    await recorder.current.init();
    setStatus(WAITING);
    autoRecord && onStartRecord();
  };

  /** @desc 处理开始录制 */
  const onStartRecord = () => {
    const start = () => {
      recorder.current.start();
      // 设置预览视频流
      recorder.current.preview(videoRef.current);
      setStatus(RECORDING);
    };
    autoRecord ? setTimeout(() => start(), autoRecordTimeout) : start();
  };

  /** @desc 处理结束录制 */
  const onStopRecord = () => {
    recorder.current.stop();
    // @note 等待 blob 生成，下一个 RAF 下载
    autoDownloadAfterStopRecord && setTimeout(() => onDownloadRecord());
    setStatus(END);
  };

  /** @desc 处理新录制 */
  const onNewRecord = () => {
    recorder.current.reset();
    setTimeout(() => (videoRef.current.srcObject = undefined));
    setStatus(START);
  };

  /** @desc 处理下载录制视频 */
  const onDownloadRecord = () => {
    recorder.current.download();
  };

  /** @desc 处理暂停、继续录制视频 */
  const onPauseOrResumeRecord = () => {
    pauseRecord ? recorder.current.resume() : recorder.current.pause();
    setPauseRecord(!pauseRecord);
  };

  useEffect(() => {
    return () => {
      recorder.current?.isStart() && recorder.current.stop();
      recorder.current = null;
    };
  }, []);

  return (
    <div class="container mx-auto m-20 flex flex-col justify-start items-center">
      <div class="bg-recorder-media bg-no-repeat w-96 h-96 bg-contain px-4 pt-2">
        <video
          autoplay
          controls={status === RECORDING}
          ref={videoRef}
          controlslist="nodownload nofullscreen noremoteplayback"
          disablepictureinpicture
        />
      </div>
      {status === START && (
        <>
          <div class="container flex justify-center items-center py-10">
            <Select>
              <Option value="1">{t("screenOnly")}</Option>
              <Option value="2">{t("Screen&Webcam")}</Option>
            </Select>

            <Select>
              <Option value="1">{t("microAudio")}</Option>
              <Option value="2">{t("browserAudio")}</Option>
              <Option value="3">{t("sysAudio+MicroAudio")}</Option>
              <Option value="4">{t("noAudio")}</Option>
            </Select>
          </div>
          <div class="container flex justify-center py-6">
            <CheckBox
              label={t("autoRecord")}
              value={autoRecord}
              onChange={(e: Event) => setAutoRecord(e.target.value)}
            />
          </div>
          <div class="container flex justify-center py-6">
            <Button onClick={onShareScreen}>{t("shareScreen")}</Button>
          </div>
        </>
      )}
      {status === WAITING && (
        <div class="container flex flex-col justify-center items-center py-12">
          <CircleButton onClick={onStartRecord} />
          <span class="m-4"> {t("startRecording")}</span>
        </div>
      )}
      {status === RECORDING && (
        <div class="container flex flex-col justify-center items-center py-12">
          <SquareButton onClick={onStopRecord} />
          <span class="m-4"> {t("stopRecording")}</span>
          <div class="pt-6">
            <div
              onClick={onPauseOrResumeRecord}
              title={t(pauseRecord ? "resumeRecording" : "pauseRecording")}
              class={`${
                pauseRecord ? "bg-recorder-play" : "bg-recorder-pause"
              } w-12 h-12 bg-contain rounded-full cursor-pointer`}
            />
          </div>
        </div>
      )}
      {status === END && (
        <>
          <div class="container flex justify-center py-12">
            <Button onClick={onNewRecord}>{t("newRecording")}</Button>
          </div>
          <div class="container flex justify-center py-6 border w-96">
            <div
              onClick={onDownloadRecord}
              class="bg-recorder-download w-16 h-16 bg-contain cursor-pointer mx-4"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RecordingPage;
