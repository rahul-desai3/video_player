$(document).ready(function(){
var video = document.getElementById("video");

video.volume = $("input#volume").val();

$("button#play_pause_button").click(function(){
	if(video.paused){
		video.play();
		$("button#play_pause_button").html("Pause");
		var seekbar_update = setInterval(function(){
			$("input#seekbar").val(video.currentTime / video.duration * 10);								
		}, 25);
	}
	else{
		video.pause();
		window.clearInterval(seekbar_update);
		$("button#play_pause_button").html("Play");
	}						
});

$("input#seekbar").change(function(){
	video.currentTime = video.duration * $("input#seekbar").val() / 10;
})

var volume_backup = 0;
$("button#mute_button").click(function(){
	if(video.muted == false){
		volume_backup = video.volume;
		video.muted = true;
		$("button#mute_button").html("Unmute");
		$("input#volume").val(0);
	}
	else{
		video.muted = false;
		$("button#mute_button").html("Mute");
		if(volume_backup == 0){
			video.volume = 0.5;
			$("input#volume").val(0.5);
		}
		else{
			video.volume = volume_backup;
			$("input#volume").val(volume_backup);
		}
	}
});

$("input#volume").change(function(){
	video.volume = $("input#volume").val();
	if($("input#volume").val() == 0)
		$("button#mute_button").html("Unmute");
	else
		$("button#mute_button").html("Mute");
});

$("button#fullscreen_button").click(function(){
	if(video.requestFullscreen)
		video.requestFullscreen();
	else if(video.msRequestFullscreen)
		video.msRequestFullscreen();
	else if(video.mozRequestFullScreen)
		video.mozRequestFullScreen();
	else if(video.webkitRequestFullscreen)
		video.webkitRequestFullscreen();
});

$("button#rewind_button").click(function(){
	video.pause();
	video.currentTime -= 3;
	video.play();
	var seekbar_update = setInterval(function(){
			$("input#seekbar").val(video.currentTime / video.duration * 10);								
		}, 25);
	$("button#play_pause_button").html("Pause");
});

$("button#forward_button").click(function(){
	video.pause();
	video.currentTime += 3;
	video.play();
	var seekbar_update = setInterval(function(){
			$("input#seekbar").val(video.currentTime / video.duration * 10);								
		}, 25);
	$("button#play_pause_button").html("Pause");
});

$("button#replay_button").click(function(){
	video.pause();
	video.currentTime = 0;
	video.play();
	var seekbar_update = setInterval(function(){
			$("input#seekbar").val(video.currentTime / video.duration * 10);								
		}, 25);
	$("button#play_pause_button").html("Pause");
});

$("video#video").bind("ended", function() {
	$("button#play_pause_button").html("Play");
	$("input#seekbar").val(0);
});
});