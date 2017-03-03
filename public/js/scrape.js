$(document).ready(() => {

    $('#submit-comment').on('click', (e) => {
        e.preventDefault();
        let articleTitle = $('form').attr('data-title');
        let userName = $('#name').val().trim();
        let userComment = $('#comment').val().trim();
        let postObj = {
            title: articleTitle,
            name: userName,
            comment: userComment
        };
        if (userName === '' || userComment === '') {
            console.log('please enter name and comment');
            return;
        }
        $.post('/submitcomment', postObj, (req, res) => {

            $('#comment').val('Posted');
        });
    })

    $('.delete-comment').on('click', function(e) {
        e.preventDefault();
        let articleTitle = $('form').attr('data-title');
        let deleteParent = $(this).parent();
        let deleteComment = $(this).siblings('.user-comment').text();
        deleteParent.remove();
        $.ajax({
            url: '/deletecomment',
            type: 'DELETE',
            data: {
                title: articleTitle,
                comment: deleteComment
            },
            success: function(result) {
                // Do something with the result
            }
        });
    })

});
