var customButton = $(".customization-button");
var customBar = $(".customization-bar");
var columns = $(".column");
var custom = { refresh: function()
                {
                    this["width"] = +customBar.find("input[name='workplace-width']").val();
                    this["height"] = +customBar.find("input[name='workplace-height']").val();
                    this["width_fixed"] = customBar.find("input[name='fixed-width']").prop("checked");
                    this["height_fixed"] = customBar.find("input[name='fixed-height']").prop("checked");
                    return this;
                }
            }.refresh();

var renderer = {
    editNote: function(item, edition){
        edition = undefined === edition ? true : edition;
        var title = edition ? item.find("h2").text() : "";
        var description = edition ? item.find("div.description").html().trim() : "";

        item.html('<h2><input type="text" class="title" value="' + title + '" ></h2>' +
    '<div class="controll clearfix">' +
        '<button class="delete-item" title="Удалить"></button>' +
        '<button class="edit-item" title="Редактировать"></button>' +
        '<button class="analogy" title="Покаать аналогии">3</button>' + 
        '<button class="sub-item" title="Показать подэлементы">2</button>' +
        '<button class="sup-item" title="Показать надэлементы">1</button>' +                   
    '</div>' +
    '<textarea class="description">' + description + '</textarea>' +
    '<button class="save-note">Сохранить</button>')
            .attr("Class","item note edit");
    },

    saveItem: function(item){
        item.removeClass("edit");
        item.find("h2").html(item.find("input.title").val());
        item.find("textarea.description").replaceWith('<div class="description">' + item.find(".description").val() + '</div>');
        item.find("button.save-note").remove();
    },

    addItem: function(item){
        item.removeClass("empty")
            .addClass("add");
        item.html('<h2>Создать</h2>' +
                '<button data-type="note">Заметку</button>' +
                '<button data-type="article">Статью(пока нельзя)</button>' +
                '<button data-type="list">Лист(пока нельзя)</button>' +
                '<button data-type="cancel">Отмена</button>');
    },

    clear: function(item){
        item.html('<div></div>')
            .attr("class", "item empty");
    },
    button: {
        note: function(item){ renderer.editNote(item, false);},
        cancel: function(item){ renderer.clear(item);}
    }
};

var checker = {
    noteIsEmpty: function(item){
        return item.find("input.title").val() == "" && item.find(".description").val() == "";
    }
};

$(".workplace").on("click", ".edit-item", function(e){
    renderer.editNote($(e.target).parents(".item"));
});

$(".workplace").on("click", ".delete-item", function(e){
    var item = $(e.target).parents(".item");
    if(checker.noteIsEmpty(item) || confirm("Вы уверены, что хотите удалить эту записаь?"))
        renderer.clear(item);
});

$(".workplace").on("click", ".save-note", function(e){
    renderer.saveItem($(e.target).parents(".item"));
});

$(".workplace").on("click", ".empty", function(e){
    renderer.addItem($(e.target));
});


$(".workplace").on("click", ".add button", function(e){
    renderer.button[e.target.dataset.type]($(e.target).parents(".item"));
});

customButton.click(function(){
    customBar.fadeToggle();
});


$(document).ready(function(){
    $(".blackboard").outerHeight($(document).outerHeight());
});