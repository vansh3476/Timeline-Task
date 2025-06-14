import SessionTimeline from "../components/session-timeline"
import '../styles/globals.css'

const sampleData = {
  meetingId: "k7tb-chj6-9sjp",
  start: "2024-04-02T11:31:52.746Z",
  end: "2024-04-02T11:50:23.198Z",
  uniqueParticipantsCount: 4,
  participantArray: [
    {
      participantId: "vCPSzABN",
      name: "bbbn",
      events: {
        mic: [
          {
            start: "2024-04-02T11:48:01.648Z",
            end: "2024-04-02T11:48:53.973Z",
          },
          {
            start: "2024-04-02T11:48:55.204Z",
            end: "2024-04-02T11:50:23.198Z",
          },
        ],
        webcam: [
          {
            start: "2024-04-02T11:48:01.773Z",
            end: "2024-04-02T11:50:23.198Z",
          },
        ],
        screenShare: [],
        screenShareAudio: [],
      },
      timelog: [
        {
          start: "2024-04-02T11:48:00.514Z",
          end: "2024-04-02T11:50:23.184Z",
        },
      ],
    },
    {
      participantId: "b8ddpv65",
      name: "rajan",
      events: {
        mic: [
          {
            start: "2024-04-02T11:32:32.073Z",
            end: "2024-04-02T11:32:33.637Z",
          },
          {
            start: "2024-04-02T11:32:34.167Z",
            end: "2024-04-02T11:39:12.377Z",
          },
          {
            start: "2024-04-02T11:46:15.832Z",
            end: "2024-04-02T11:46:58.161Z",
          },
          {
            start: "2024-04-02T11:47:00.616Z",
            end: "2024-04-02T11:47:34.462Z",
          },
          {
            start: "2024-04-02T11:50:05.249Z",
            end: "2024-04-02T11:50:16.633Z",
          },
        ],
        webcam: [
          {
            start: "2024-04-02T11:32:33.644Z",
            end: "2024-04-02T11:34:32.410Z",
          },
        ],
        screenShare: [
            {
            start: "2024-04-02T11:45:00.468Z",
            end: "2024-04-02T11:47:52.094Z",
          },
        ],
        screenShareAudio: [],
      },
      timelog: [
        {
          start: "2024-04-02T11:32:31.973Z",
          end: "2024-04-02T11:50:16.624Z",
        },
      ],
    },
    {
      participantId: "yOztorht",
      name: "gvv",
      events: {
        mic: [
          {
            start: "2024-04-02T11:45:54.765Z",
            end: "2024-04-02T11:46:29.265Z",
          },
          {
            start: "2024-04-02T11:46:35.207Z",
            end: "2024-04-02T11:47:17.225Z",
          },
          {
            start: "2024-04-02T11:47:26.492Z",
            end: "2024-04-02T11:47:52.095Z",
          },
        ],
        webcam: [
          {
            start: "2024-04-02T11:45:56.468Z",
            end: "2024-04-02T11:47:52.094Z",
          },
        ],
        screenShare: [
        ],
        screenShareAudio: [],
      },
      timelog: [
        {
          start: "2024-04-02T11:45:52.142Z",
          end: "2024-04-02T11:47:52.086Z",
        },
      ],
    },
    {
      participantId: "rilsgehg",
      name: "isha",
      events: {
        mic: [
          {
            start: "2024-04-02T11:31:54.699Z",
            end: "2024-04-02T11:39:29.768Z",
          },
          {
            start: "2024-04-02T11:39:30.763Z",
            end: "2024-04-02T11:40:03.148Z",
          },
          {
            start: "2024-04-02T11:42:54.664Z",
            end: "2024-04-02T11:43:01.313Z",
          },
          {
            start: "2024-04-02T11:43:01.449Z",
            end: "2024-04-02T11:43:20.290Z",
          },
        ],
        webcam: [
          {
            start: "2024-04-02T11:31:54.860Z",
            end: "2024-04-02T11:43:20.290Z",
          },
        ],
        errors: [
          {
            start: "2024-04-02T11:41:54.860Z",
            message: "Unable to start microphone",
          },
        ],
        screenShare: [],
        screenShareAudio: [],
      },
      timelog: [
        {
          start: "2024-04-02T11:31:53.415Z",
          end: "2024-04-02T11:40:30.283Z",
        },
        {
          start: "2024-04-02T11:40:55.415Z",
          end: "2024-04-02T11:43:20.283Z",
        },
      ],
    },
  ],
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <SessionTimeline data={sampleData} />
    </div>
  )
}
