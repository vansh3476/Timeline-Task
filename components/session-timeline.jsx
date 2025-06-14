"use client"
import React, { useState, useMemo } from "react";
import { Camera, Mic, AlertTriangle, Monitor } from "lucide-react";
import { Card } from "../components/ui/card";
import { ClipboardIcon, ErrorIcon, Frame64Icon, LeaveIcon, MicIcon, MonitorIcon, VideoIcon } from "./ui/icon";
import { getFormatedDate } from "../lib/utils";

export default function SessionTimeline({ data }) {
  const [tooltip, setTooltip] = useState({
    x: 0,
    y: 0,
    content: "",
    visible: false,
  });
  const [showParticipantTimeline, setShowParticipantTimeline] = useState(true);
  const sessionStart = new Date(data.start);
  const sessionEnd = new Date(data.end);
  const sessionDuration = sessionEnd.getTime() - sessionStart.getTime();

  const timeMarkers = useMemo(() => {
    const markers = [{
    "time": "",
    "position": 0
}];
    const totalMinutes = Math.ceil(sessionDuration / (1000 * 60));
    const interval = Math.max(1, Math.floor(totalMinutes / 10));

    for (let i = 1; i <= totalMinutes ; i += interval) {
      const time = new Date(sessionStart.getTime() + i * 60 * 1000);
      markers.push({
        time: time.getUTCHours() + ':' + time.getUTCMinutes(),
        position: (i / totalMinutes) * 100 - 2.5,
      });
    }
    markers.push({
    time:"",
    position:markers[markers.length-1].position + 5
    })
    return markers;
  }, [sessionStart, sessionDuration]);

  const getPositionFromTime = (timestamp) => {
    const time = new Date(timestamp);
    const elapsed = time.getTime() - sessionStart.getTime();
    return Math.max(0, Math.min(100, (elapsed / sessionDuration) * 100));
  };

  const formatDuration = (start, end) => {
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(duration / (1000 * 60));
    return `${minutes} Mins`;
  };

  const showTooltip = (event, content) => {
    setTooltip({
      x: event.clientX,
      y: event.clientY,
      content,
      visible: true,
    });
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  // Generate timeline segments including gaps
  const generateTimelineSegments = (participant) => {
    const segments = [];
    const sortedTimelog = [...participant.timelog].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    for (let i = 0; i < sortedTimelog.length; i++) {
      const session = sortedTimelog[i];
      const startPos = getPositionFromTime(session.start);
      const endPos = getPositionFromTime(session.end);

      segments.push({
        type: "active",
        startPos,
        endPos,
        session,
      });

      if (i < sortedTimelog.length - 1) {
        const nextSession = sortedTimelog[i + 1];
        const gapStart = getPositionFromTime(session.end);
        const gapEnd = getPositionFromTime(nextSession.start);

        if (gapEnd > gapStart) {
          segments.push({
            type: "gap",
            startPos: gapStart,
            endPos: gapEnd,
          });
        }
      }
    }

    return segments;
  };

  const renderParticipantTimeline = (participant) => {
    const participantStart = participant.timelog[0]?.start;
    const participantEnd =
      participant.timelog[participant.timelog.length - 1]?.end;

    if (!participantStart || !participantEnd) return null;

    const timelineSegments = generateTimelineSegments(participant);

    return (
      <div className="relative mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col bg-backgroundTimeline z-10 pt-3">
            <div className="text-white text-base leading-[100%] tracking-[0%] font-lato">
              {participant.name} ({participant.participantId})
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              {getFormatedDate(participantStart)},{" "}
              | Duration {formatDuration(participantStart, participantEnd)}
            </div>
          </div>
          <button className="text-micBackground hover:text-blue-300 text-xs">
            View details {">"}
          </button>
        </div>

        <div className="relative h-4 overflow-visible">
          {timelineSegments.map((segment, index) => (
            <div key={index}>
              {segment.type === "active" ? (
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-micBackground"
                  style={{
                    left: `${segment.startPos}%`,
                    width: `${segment.endPos - segment.startPos}%`,
                  }}
                  onMouseEnter={(e) =>
                    showTooltip(
                      e,
                      `Session: ${new Date(
                        segment.session.start
                      ).toISOString()} - ${new Date(
                        segment.session.end
                      ).toISOString()}`
                    )
                  }
                  onMouseLeave={hideTooltip}
                />
              ) : (
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 h-0.5 border-t border-gray-500 border-dashed"
                  style={{
                    left: `${segment.startPos}%`,
                    width: `${segment.endPos - segment.startPos}%`,
                  }}
                  onMouseEnter={(e) => showTooltip(e, "Disconnected period")}
                  onMouseLeave={hideTooltip}
                />
              )}
            </div>
          ))}
          {participant.timelog.map((session, index) => (
            <React.Fragment key={`markers-${index}`}>
              
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] bg-gray-600 rounded-full flex items-center justify-center text-xs text-white"
                style={{
                  left: `${getPositionFromTime(session.start)}%`,
                  zIndex: 10,
                }}
                onMouseEnter={(e) =>
                  showTooltip(
                    e,
                    `Joined: ${new Date(session.start).toISOString()}`
                  )
                }
                onMouseLeave={hideTooltip}
              >
                <MonitorIcon  />
              </div>

              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] bg-gray-600 rounded-full flex items-center justify-center text-xs text-white"
                style={{
                  left: `${getPositionFromTime(session.end)}%`,
                  zIndex: 10,
                }}
                onMouseEnter={(e) =>
                  showTooltip(
                    e,
                    `Left: ${new Date(session.end).toISOString()}`
                  )
                }
                onMouseLeave={hideTooltip}
              >
                <LeaveIcon />
              </div>
            </React.Fragment>
          ))}

          {participant.events.mic.map((event, index) => (
            <div
              key={`mic-${index}`}
              className="absolute w-[22px] h-[22px] top-1/2 p-0.5 transform -translate-y-1/2  bg-micBackground rounded-md flex items-center justify-center text-xs font-bold text-white"
              style={{
                left: `${getPositionFromTime(event.start)}%`,
                zIndex: 10,
              }}
              onMouseEnter={(e) =>
                showTooltip(
                  e,
                  `Mic On: ${new Date(event.start).toISOString()}${
                    event.end
                      ? ` - ${new Date(event.end).toISOString()}`
                      : ""
                  }`
                )
              }
              onMouseLeave={hideTooltip}
            >
              
                <MicIcon />
            </div>
          ))}

          {participant.events.webcam.map((event, index) => (
            <div
              key={`webcam-${index}`}
              className="absolute top-1/2 transform -translate-y-1/2 w-[22px] h-[22px] bg-micBackground rounded-md flex items-center justify-center text-xs font-bold p-0.5 text-white"
              style={{
                left: `${getPositionFromTime(event.start)}%`,
                zIndex: 10,
              }}
              onMouseEnter={(e) =>
                showTooltip(
                  e,
                  `Camera On: ${new Date(event.start).toISOString()}${
                    event.end
                      ? ` - ${new Date(event.end).toISOString()}`
                      : ""
                  }`
                )
              }
              onMouseLeave={hideTooltip}
            >
              <VideoIcon  />
            </div>
          ))}

          {participant.events.errors?.map((error, index) => (
            <div
              key={`error-${index}`}
              className="absolute top-1/2 transform -translate-y-1/2 w-[14px] h-[14px] bg-errorBackground rounded-full flex items-center justify-center  text-xs font-bold text-white"
              style={{
                left: `${getPositionFromTime(error.start)}%`,
                marginLeft: "-10px",
                zIndex: 10,
              }}
              onMouseEnter={(e) =>
                showTooltip(
                  e,
                  `Error: ${error.message} at ${new Date(
                    error.start
                  ).toISOString()}`
                )
              }
              onMouseLeave={hideTooltip}
            >
              <ErrorIcon className="w-2.5 h-2.5" />
            </div>
          ))}

          {participant.events.screenShare.map((event, index) => (
            <div
              key={`screen-${index}`}
              className="absolute top-1/2 transform -translate-y-1/2 w-[22px] h-[22px] bg-micBackground rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{
                left: `${getPositionFromTime(event.start)}%`,
                marginLeft: "-10px",
                zIndex: 10,
              }}
              onMouseEnter={(e) =>
                showTooltip(
                  e,
                  `Screen Share: ${new Date(event.start).toISOString()}${
                    event.end
                      ? ` - ${new Date(event.end).toISOString()}`
                      : ""
                  }`
                )
              }
              onMouseLeave={hideTooltip}
            >
              <Frame64Icon className="w-2.5 h-2.5" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="bg-background">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <ClipboardIcon />
            <h2 className="text-white font-lato font-bold text-sm leading-[100%] tracking-[0%]">
              Participants wise Session Timeline
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">
              Show participant timeline
            </span>
            <button
              onClick={() =>
                setShowParticipantTimeline(!showParticipantTimeline)
              }
              className={`w-10 h-6 rounded-full transition-colors ${
                showParticipantTimeline ? "bg-blue-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  showParticipantTimeline ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="relative border-b border-border bg-gray-600 rounded-t-lg" style={{background:'#181818'}}>
          <div className="flex justify-between text-xs text-gray-400 px-4 py-3 h-[37px]" style={{border:'none'}}>
            {timeMarkers.map((marker, index) => (
              <div key={index} className="absolute top-[27%] text-center" style={{
                left: `${marker.position - 1.5}%`,
                zIndex: 0,
              }}>
                {marker.time}
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-backgroundTimeline rounded-b-lg">
          {timeMarkers.flatMap((marker, index) => !marker.time ? []:(
            <div
              key={`main-grid-${index}`}
              className="absolute top-0 bottom-0 w-px bg-gray-600 opacity-30"
              style={{
                left: `${marker.position}%`,
                zIndex: 0,
              }}
            />
          ))}

          {showParticipantTimeline && (
            <div className="relative  py-2">
              {data.participantArray.map((participant,index) => (
                <>
                <div key={participant.participantId} className="relative z-10 px-4">
                  {renderParticipantTimeline(participant)}
                </div>
                          <div className={`mt-6 h-[1px] bg-gray-600 w-full`} />

                </>
              ))}
            </div>
          )}
        </div>

      </Card>

      {tooltip.visible && (
        <div
          className="fixed z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 30,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
