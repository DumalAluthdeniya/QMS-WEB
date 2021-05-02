// Initiate summernote wysiwyg editor
$('#summernote').summernote({
    dialogsInBody: true,
    minHeight: 300,
    toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough']],
        ['para', ['paragraph']],
        ['list', ['ul']],
        ['numberlist', ['ol']]
    ]
}); 

$("#test").click(function(){
	var markupStr = $('#summernote').summernote('code');
	console.log(markupStr);
});
	