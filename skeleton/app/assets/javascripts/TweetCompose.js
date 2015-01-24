$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$submit = $("[value='Post Tweet!']");
  this.bindEvents();
};

$.TweetCompose.prototype.bindEvents = function(){
  $("textarea").on("input", this.charCounter.bind(this));
  this.$el.on("submit", this.submit.bind(this));
};

$.TweetCompose.prototype.charCounter = function(event){
  var charCount = $("textarea").val().length;
  $("strong").html(140 - charCount + " characters left.");
};

$.TweetCompose.prototype.submit = function(event){
  event.preventDefault();
  var formData = $(event.currentTarget).serialize();
  var that = this;
  $(":input").prop("disabled", true);
  $.ajax({
    url: "/tweets",
    type: "POST",
    dataType: "json",
    data: formData,
    success: function (data) {
      that.handleSuccess(data);
    }
  });
};

$.TweetCompose.prototype.clearInput = function () {
  $("textarea").val("");
  $("option:first-child").prop("selected", true);
};

$.TweetCompose.prototype.handleSuccess = function (data) {
  this.clearInput();
  $(":input").prop("disabled", false);
  var idUl = this.$el.data("tweets-ul");
  $(idUl).prepend(JSON.stringify(data));
};

$.fn.TweetCompose = function () {
  return this.each(function (idx, el) {
    new $.TweetCompose(el);
  });
};

$(function () {
  $("form.tweet-compose").TweetCompose();
});
