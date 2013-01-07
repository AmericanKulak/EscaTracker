$(document).ready(function(){

	$("button.followUp").click(function(){
		$("#followUpModal").modal("show");
		id=$(this).attr("context_id");
		revID=$(this).attr("context_revid");
	});

	$("button.resolve").click(function(){
		$("#resolveModal").modal("show");
		id=$(this).attr("context_id");
		revID=$(this).attr("context_revid");
	});

	$("button.addButton").click(function(){
		$("#createModal").modal("show");
		$("#issueLastFollowUpDate").val(getDateRep());
	});

	$("#updateButton").click(function(){

	});

	$("#resolveButton").click(function(){
		var dtitle = $("#issueTitle").val();
		var dsubject = $("#issueEscTo").val();
		var dprevious = $("#issueLastFollowUpDate").val();
		var dnext = $("#issueFollowUpDate").val();

		var data=
		{
			_id: id,
			_rev: revID,
			Title: dtitle,
			Subject: dsubject,
			Previous: dprevious,
			Next: dnext,
			Resolved: "resolved"
		};
		create(data);
	});

	$("#createButton").click(function(){
		var dtitle = $("#issueTitle").val();
		var dsubject = $("#issueEscTo").val();
		var dprevious = $("#issueLastFollowUpDate").val();
		var dnext = $("#issueFollowUpDate").val();

		var data=
		{
			Title: dtitle,
			Subject: dsubject,
			Previous: dprevious,
			Next: dnext,
			Resolved: "unresolved"
		};
		create(data);
	});
});

var id=0;
var revID=0;

function followUp(data){
	var success = function(response){
		return location.href = "/";
	};

	// post to server
	$.ajax({
		"url" : "/update",
		"dataType" : "json",
		"data" : {issue: data},
		"type" : "PUT",
		"success" : success
	});
}

function create(data){
	var success = function(response){
		return location.href = "/";
	};

	// post to server
	$.ajax({
		"url" : "/create",
		"dataType" : "json",
		"data" : {issue: data},
		"type" : "POST",
		"success" : success
	});
}

function resolve(data){
	var success = function(response){
		return location.href = "/";
	};

	// post to server
	$.ajax({
		"url" : "/update",
		"dataType" : "json",
		"data" : {issue: data},
		"type" : "PUT",
		"success" : success
	});
}

function getDateRep(){
	var d = new Date();
	return (d.getMonth()+1)+"/"+(d.getDate())+"/"+d.getFullYear();
}