$(document).ready(function(){

	$("button.followUp").click(function(){
		$("#followUpModal").modal("show");
		id=$(this).attr("name");
	});

	$("button.resolve").click(function(){
		$("#resolveModal").modal("show");
		id=$(this).attr("name");

	});

	$("button.addButton").click(function(){
		$("#createModal").modal("show");
		$("#issueLastFollowUpDate").val(getDateRep());
	});

	$("#updateButton").click(function(){
		var data=
		{
			"_id": id,
			"_rev": $("form[name="+id+"] > input[name='_revid']").val(),
			"title": $("form[name="+id+"] > input[name='issue']").val(),
			"subject": $("form[name="+id+"] > input[name='escto']").val(),
			"previous": getDateRep(),
			"next": $("#nextFollowUpDate").val(),
			"resolved": "unresolved"
		};
		update(data);
	});

	$("#resolveButton").click(function(){
		var data=
		{
			"_id": id,
			"_rev": $("form[name="+id+"] > input[name='_revid']").val(),
			"title": $("form[name="+id+"] > input[name='issue']").val(),
			"subject": $("form[name="+id+"] > input[name='escto']").val(),
			"previous": $("form[name="+id+"] > input[name='prev']").val(),
			"next": $("form[name="+id+"] > input[name='next']").val(),
			"resolved": "resolved"
		};
		update(data);
	});

	$("#createButton").click(function(){
		var dtitle = $("#issueTitle").val();
		var dsubject = $("#issueEscTo").val();
		var dprevious = $("#issueLastFollowUpDate").val();
		var dnext = $("#issueFollowUpDate").val();

		var data=
		{
			"title": dtitle,
			"subject": dsubject,
			"previous": dprevious,
			"next": dnext,
			"resolved": "unresolved"
		};
		create(data);
	});
});

var id=0;
var revID=0;

function create(data){
	var success = function(response){
		return location.href = "/issues";
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

function update(data){
	var success = function(response){
		return location.href = "/issues";
	};

	// post to server
	$.ajax({
		"url" : "/update/"+data._id,
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