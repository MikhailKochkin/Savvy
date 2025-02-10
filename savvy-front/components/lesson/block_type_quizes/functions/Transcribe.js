import React, { useState, useRef } from "react";
import { Button1 } from "../../styles/commonElements/QuestionStyles";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

const VoiceRecorder = (props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  /**
   * Request access to the microphone and start recording.
   */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Combine all chunks into a single blob
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        // Convert blob to base64
        const base64Audio = await blobToBase64(blob);
        // Send to API route
        await sendToAPI(base64Audio, "recording.webm");
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  /**
   * Stop the recorder
   */
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  /**
   * Convert Blob -> Base64
   */
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]); // remove the "data:...base64," prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  /**
   * Upload the base64-encoded audio to our Next.js API route
   */
  const sendToAPI = async (base64Data, fileName) => {
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64Data, fileName }),
      });
      const data = await res.json();
      console.log("data", data);
      if (res.ok) {
        setTranscript(data.transcript);
        props.passTranscribedText(data.transcript);
      } else {
        console.error("Transcription error:", data.error);
      }
    } catch (error) {
      console.error("Error sending audio to API:", error);
    }
  };

  return (
    <div>
      <Button1 onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? (
          <BiMicrophoneOff
            className="icon"
            style={{ fontSize: "1.8rem" }}
            value={{ className: "react-icons" }}
          />
        ) : (
          <BiMicrophone
            className="icon"
            style={{ fontSize: "1.8rem" }}
            value={{ className: "react-icons" }}
          />
        )}
      </Button1>
      {/* <Button1
        onClick={(e) =>
          props.passTranscribedText(
            "so a share deal is when you transfer the comoany in one go through the sale of shares"
          )
        }
      >
        Pass text
      </Button1> */}
      {/* 
      {transcript && (
        <p>
          <strong>Transcript:</strong> {transcript}
        </p>
      )} */}
    </div>
  );
};

export default VoiceRecorder;
