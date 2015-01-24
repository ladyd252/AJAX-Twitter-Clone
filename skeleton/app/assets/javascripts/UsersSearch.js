$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find('input');
  this.$ulUsers = this.$el.find('ul');
  this.handleInput();
  this.renderResults();
};



$.UsersSearch.prototype.handleInput = function () {
  var that = this;
  this.$input.on('input', function(event) {
    $.ajax({
      url: "/users/search",
      dataType: "json",
      data: { "query": that.$input.val() },
      type: "GET",
      success: function(data){
        that.renderResults();
        for (var i = 0; i < data.length; i++) {
          var followState = "unfollowed";
          if(data[i].followed){
            followState = "followed";
          }
          var $result = $('<li><a href="/users/' + data[i].id + '">' + data[i].username + '</a></li>');
          that.$ulUsers.append($result);
          var $userButton = $('<button class="follow-toggle" data-follow-state="' + followState + '" data-user-id="' + data[i].id + '"></button>');
          $userButton.followToggle();
          $result.append($userButton);
        }
      },
      error: function () {
        debugger;
      }
    });


  });
};

$.UsersSearch.prototype.renderResults = function () {
  this.$ulUsers.html("");
}

$.fn.UsersSearch = function () {
  return this.each(function (idx, el) {
    new $.UsersSearch(el);
  });
};

$(function () {
  $("div.users-search").UsersSearch();
});
