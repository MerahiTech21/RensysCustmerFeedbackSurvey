
import {parseISO,formatDistanceToNow} from 'date-fns'

import React from 'react'

function TimeAgo({timestamp}) {

    let timeago=''
    if(timestamp){
        const date=parseISO(timestamp)
        const timePeriod=formatDistanceToNow(date)
        timeago=`Updated ${timePeriod} ago`
    }
  return (
    <span title={timestamp}>
        &nbsp;<i>{timeago} </i> 
    </span>
  )
}

export default TimeAgo