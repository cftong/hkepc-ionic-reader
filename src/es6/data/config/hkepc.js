/**
 * Created by Gaplo917 on 9/1/2016.
 */
//module.exports = {
//  domain: 'http://www.hkepc.com/',
//  forum: {
//    image:'http://www.hkepc.com/forum/',
//    index: 'http://www.hkepc.com/forum/index.php',
//    topics: (topicId,page) => `http://www.hkepc.com/forum/forumdisplay.php?fid=${topicId}&page=${page}`,
//    posts: (topicId,postId,page) => `http://www.hkepc.com/forum/viewthread.php?fid=${topicId}&tid=${postId}&page=${page}`,
//    login: 'http://www.hkepc.com/forum/logging.php?action=login&loginsubmit=yes&floatlogin=yes&inajax=1'
//  },
//
//  data:{
//    topics:{
//      "120" : "興趣百科"
//    }
//  }
//}

module.exports = {
  domain: 'http://www.hkepc.com/',
  forum: {
    image:'/forum/',
    index: '/forum/index.php',
    topics: (topicId,page) => `/forum/forumdisplay.php?fid=${topicId}&page=${page}`,
    posts: (topicId,postId,page) => `/forum/viewthread.php?fid=${topicId}&tid=${postId}&page=${page}`,
    login: '/forum/logging.php?action=login&loginsubmit=yes&floatlogin=yes&inajax=1'
  },

  data:{
    topics:{
      "120" : "興趣百科"
    }
  }
}