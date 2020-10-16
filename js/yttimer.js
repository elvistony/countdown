var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let destination;
function onPlayerReady(event) {
  var playButton = document.getElementById("play-button");
  console.log(player.getDuration());
  CountDown(destination,player.getDuration())
}

var player;
var vidElement = document.getElementById('ifr')
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ifr', {
    events: {
        'onReady': onPlayerReady
    },
    videoId: 'bpOR_HuHRNs',
    });
}

var videoOn=false;
function startVideoAt(seeker) {
  if(videoOn==false){
    setTimeout(()=>{    document.getElementById('ifr').style.opacity="1";
    document.getElementsByClassName('cover')[0].style.opacity="0.5"; 
   },3800)
    player.seekTo(seeker)
    player.playVideo()
    player.setVolume(70);
    videoOn=true;
  }
}

var toast = document.getElementsByClassName('toast')[0];

function toaster(msg){
  toast.innerHTML=msg;
  toast.style.opacity="0.6";
  toast.style.bottom="5%";
  toast.style.fontSize="20px";
  setTimeout(function(){
    toast.style.opacity="0";
    toast.style.bottom="8%";
    toast.style.fontSize="18px";
  },6000)
  setTimeout(function(){
    toast.style.bottom="2%"
  },7000)
}

var msgs=[]

  let postmsg;
function setOptions(){
  var data = getCookie('Counter')
  if(data==""){
    setCookie('{"title":"The Event will begin in","posttimer":"a matter of moments","youtube_id":"hYgKv4ZxaCM","mode":"duration","blur":true,"time":"17:10"}')
    setOptions()
  }else{
    var parsed = JSON.parse(data)
    if(parsed['youtubeID']!=""){
      document.getElementById('ifr').src='https://www.youtube-nocookie.com/embed/'+parsed['youtubeID']+'?enablejsapi=1&controls=0&rel=0'
    }
    document.getElementsByClassName("title")[0].innerText=parsed['title'];
    if(parsed['blur']==true){
      document.getElementById('ifr').style.filter='blur(6px)';
    }
    if(parsed['tint']==false){
      document.getElementsByClassName('cover')[0].style.opacity="0";
      console.log("no tint");
    }else{
      document.getElementsByClassName('cover')[0].style.opacity="0.5 !important";
    }
    document.getElementsByClassName('cover')[0].style.background=parsed['color'];
    console.log(parsed['color']);
    postmsg = parsed['posttimer'];
    var d1 = new Date ();
    var d = new Date (d1);
    if(parsed['mode']=='duration'){
      console.log(d);
      d.setHours(d.getHours()+(parsed['time'].split(':')[0]*1))
      d.setMinutes(d.getMinutes()+(parsed['time'].split(':')[1]*1))
      d.setSeconds(d.getSeconds()+(parsed['time'].split(':')[2]*1))
      console.log(d);
    }else{
      console.log(parsed['time'])
      d.setHours(parsed['time'].split(':')[0]*1)
      d.setMinutes(parsed['time'].split(':')[1]*1)
      d.setSeconds(parsed['time'].split(':')[2]*1)
    }
    destination=d.getTime();
    var m = decodeURI(parsed['msgs']).split('^')
    if(m.length>0){
        msgs=m;
    }
  }
}

setOptions()
var toasting = false;

function StartToasts(){
  if (toasting==true){
    return;
  }
  i=0;
  toasting=true;
  var tt = setInterval(function() {
    if(i<msgs.length){
      toaster(msgs[i])
      i++
    }else{
      clearInterval(tt)
      toasting=false;
    }
  },10000)
}


function CountDown(date,vidlen) {
  var counter = document.getElementsByClassName('subtitle')[0]
  var Time
  var countDownDate = date
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    counter.innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    onlySec = Math.floor((distance % (1000 * 60 * 60)) / (1000 ));

    if(onlySec <= vidlen+2){
      startVideoAt(vidlen-onlySec+2)
    }
    StartToasts()
    if (distance<=0) {
      clearInterval(x);
      vidElement.style.opacity="0";
      setTimeout(()=>{
        //
      },500)
      counter.innerHTML = "a few Moments!";
    }
    if (minutes==0 && seconds == 4 ) {
      document.getElementsByClassName('cover')[0].style.opacity=1;
      
      vidElement.style.opacity="0";
    }
  }, 1000);
}