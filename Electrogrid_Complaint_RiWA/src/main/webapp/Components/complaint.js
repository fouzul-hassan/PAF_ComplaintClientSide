$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == ""){
		$("#alertSuccess").hide();
	}
	
	$("#alertError").hide();
});
	
//SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
		
	// Form validation-------------------
	var status = validateComplaintForm();
	if (status != true){
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
		
	// If valid------------------------
	var type = ($("#hidConIDSave").val() == "") ? "POST" : "PUT";
	$.ajax(
	{
		url : "ComplaintAPI",
		type : type,
		data : $("#formCon").serialize(),
		dataType : "text",
		complete : function(response, status){
			onComplaintSaveComplete(response.responseText, status);
		}
		});
});



function onCompleteSaveComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
		} else if (status == "error")
		{
			$("#alertError").text("Error while saving.");
			$("#alertError").show();
		} else
		{
			$("#alertError").text("Unknown error while saving..");
			$("#alertError").show();
	}
		$("#hidConIDSave").val("");
		$("#formCon")[0].reset();
}



//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	$("#compID").val($(this).data("compID"));
	$("#userID").val($(this).closest("tr").find('td:eq(1)').text());
	$("#des").val($(this).closest("tr").find('td:eq(2)').text()); 
	$("#answer").val($(this).closest("tr").find('td:eq(3)').text());
	$("#updatedDate").val($(this).closest("tr").find('td:eq(4)').text());
	$("#compDate").val($(this).closest("tr").find('td:eq(5)').text());
	$("#cstatus").val($(this).closest("tr").find('td:eq(6)').text());
});


//DELETE=================================================
$(document).on("click", ".btnRemove", function(event)
		{
			$.ajax(
			{
				url : "ComplaintAPI",
				type : "DELETE",
				data : "compID=" + $(this).data("compID"),
				dataType : "text",
				complete : function(response, status)
				{
					onComplaintDeleteComplete(response.responseText, status);
				}
			});
});


function onComplaintDeleteComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
		} else if (status == "error")
		{
			$("#alertError").text("Error while deleting.");
			$("#alertError").show();
		} else
		{
			$("#alertError").text("Unknown error while deleting..");
			$("#alertError").show();
	}
}


//========== VALIDATION ================================================
function validateComplaintForm()
{
		// User
		if ($("#userID").val().trim() == "")
		{
			return "Insert User ID!!";
		}
		
		// Description
		if ($("#des").val().trim() == "")
		{
			return "Insert Description!!";
		}

		
		return true;
}
