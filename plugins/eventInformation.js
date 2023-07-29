import sanityClient from '~/sanityClient'
// import { addMinutes } from 'date-fns'

const query = `{
  "siteSettings": *[_id == "siteSettings"][0]{
    ...,
    headermenue[]->{ title, slug},
    footermenue[]->{ title, slug}

  },
  "sessions": *[ _type == "session"]{
    ...
  },
  "youtubelinks": *[_type == "youtube"][0].videolinks[]{
  	"title": title,
  	"link": link
	}
}
`
// "program": *[_id == "program"][0] {
//   ...,
//   schedule[] {
//     ...,
//     session-> {
//       ...,
//       persons[] {
//         person-> {
//           ...,
//           image {
//             ...,
//             asset->
//           }
//         }
//       }
//     }
//   }
// }

// function populateWithDates(program, from) {
//   /**
//    * Calculates session time slot by looping trough all sessions
//    * adding their duration to their start time.
//    */
//   const schedule = program.schedule.reduce((allSessions, session, index) => {
//     const prevSession = allSessions[index - 1]
//     const fromTime = prevSession
//       ? new Date(addMinutes(prevSession.fromTime, prevSession.duration))
//       : from
//     return allSessions.concat([{ ...session, fromTime }])
//   }, [])
//   return { ...program, schedule }
// }

export default ({ store }) => {
  // console.log('sanity fetch siteinfo', query)
  return sanityClient
    .fetch(query)
    .then(({ siteSettings, sessions, youtubelinks }) => {
      console.log('youtube', youtubelinks)
      store.commit('setSiteSettings', siteSettings)
      store.commit('setSessions', sessions)
      store.commit('setYoutubeLinks', youtubelinks)
    })
}
