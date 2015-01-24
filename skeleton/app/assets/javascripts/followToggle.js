$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userID = this.$el.data('user-id') || options.userId;
  this.followState = this.$el.data('follow-state') || options.followState;
  this.render();
  this.handleClick();
};

$.FollowToggle.prototype.render = function () {
  // debugger;
  if (this.followState === "unfollowed"){
    this.$el.text("Follow!");
    this.$el.prop("disabled", false);
  } else if (this.followState === "followed"){
    this.$el.prop("disabled", false);
    this.$el.text("Unfollow!");
  }else {
    this.$el.prop("disabled", true);
  }
};

$.FollowToggle.prototype.handleClick = function () {
  var that = this;
  this.$el.on('click', function(event) {
    event.preventDefault();
    if(that.followState === "unfollowed"){
      var typeRequest = "POST";
      that.followState = "following";
    }else{
      var typeRequest = "DELETE";
      that.followState = "unfollowing";
    }
    that.render();
    $.ajax({
      url: "/users/" + that.userID + "/follow",
      dataType: "json",
      type: typeRequest,
      success: function(){
        that.followState = ((that.followState === "following") ? "followed" : "unfollowed")
        that.render();
      }
    });
  });
};

$.fn.followToggle = function (options) {
  return this.each(function (idx, el) {
    new $.FollowToggle(el, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
