import Foundation
import Capacitor
import AVFoundation

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(Recorder)
public class Recorder: CAPPlugin {
    var recordingDir: URL!
    var audioRecorder: AVAudioRecorder!
    let audioEngine = AVAudioEngine()
    var isPlaying = false
    
    // Audio の型定義
    struct Audio: Codable {
        var name: String
        var duration: String
        var path: String
    }
    
    // 録音終了後の音源
    struct RecordedAudio: Codable {
//        var audios: [Audio]
        var fullAudio: Audio
        var folderID: String
    }

    // エラーコード定義
    enum ErrorCode: String {
        case permissionError = "permission_error"
        case argumentError = "argument_error"
        case folderManipulationError = "folder_manipulation_error"
        case jsonSerializeError = "json_serialize_error"
        case AVManipularionError = "AV_manipularion_error"
    }
    

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": value
        ])
    }
    
    @objc func initialize(_ call: CAPPluginCall) {
        let session = AVAudioSession.sharedInstance()
        session.requestRecordPermission { [weak self] granted in
            guard self != nil else {return}
            if !granted {
                call.reject(ErrorCode.permissionError.rawValue)
            } else {
                call.resolve(["status": "ok"])
            }
        }
        
        let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
        recordingDir = paths[0]
        if !FileManager.default.fileExists(atPath: recordingDir.path) {
            do {
                try FileManager.default.createDirectory(atPath: recordingDir.path, withIntermediateDirectories: true)
            }
            catch {
                call.reject(ErrorCode.folderManipulationError.rawValue)
            }

        }
        
        do {
            try session.setCategory(.playAndRecord, mode: .default)
            try session.setActive(true)
                
            let settings = [
                AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
                AVSampleRateKey: 44100,
                AVNumberOfChannelsKey: 2,
                AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
            ]
            let url = recordingDir.appendingPathComponent("recording.m4a")
            audioRecorder = try AVAudioRecorder(url: url, settings: settings)
        }
        catch {
            call.reject(ErrorCode.AVManipularionError.rawValue)
        }
        
    }
    
    @objc func record(_ call: CAPPluginCall) {
        if !audioRecorder.isRecording {
            audioRecorder.record()
        } else {
            audioRecorder.stop()
        }
        call.resolve(["status": "ok"])
    }
    
    @objc func play(_ call: CAPPluginCall) {
        if !isPlaying {
            isPlaying = true
            do {
                let audioFile = try AVAudioFile(forReading: recordingDir.appendingPathComponent("recording.m4a"))
                let audioNode = AVAudioPlayerNode()
                audioEngine.attach(audioNode)
                audioEngine.connect(audioNode, to: audioEngine.mainMixerNode, format: audioFile.processingFormat)
                audioNode.stop()
                audioNode.scheduleFile(audioFile, at: nil) {
                    self.isPlaying = false
                }
                try audioEngine.start()
                audioNode.play()
            }
            catch {
                print("error")
                call.reject(ErrorCode.AVManipularionError.rawValue)
            }

        }
        call.resolve(["status": "ok"])
    }
    
    @objc func export(_ call: CAPPluginCall) {
        let asset = AVURLAsset(url: recordingDir.appendingPathComponent("recording.m4a"))
        let audio = Audio(name: "audio", duration: String(asset.duration.value), path: recordingDir.appendingPathComponent("recording.m4a").absoluteString)
        do {
            let encoder = JSONEncoder()
            encoder.keyEncodingStrategy = .convertToSnakeCase
            let data = try encoder.encode(audio)
            guard let message = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] else {
                call.reject(ErrorCode.jsonSerializeError.rawValue)
                return
            }
            call.resolve(message)
        }
        catch {
            call.reject(ErrorCode.AVManipularionError.rawValue)
        }
    }
    
    
}
