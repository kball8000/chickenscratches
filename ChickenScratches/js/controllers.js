var app = angular.module('csControllers', ['csServices', 'csFilters', 'ngSanitize', 'firebase'])
.controller('mainCtrl', function($firebaseObject, $firebaseArray, $scope, $timeout, csTest, testFilter) {

  let messagesRef = firebase.database().ref('/scratchMessages');
  let settingsRef = firebase.database().ref('/scratchSettings');
  this.messages = $firebaseArray(messagesRef);
  this.settings = $firebaseObject(settingsRef);
  this.selectedMsg = {}

  let p1 = this.settings.$loaded().then(r => console.log('settings are loaded p1', r));
  let p2 = this.messages.$loaded().then(r => console.log('messages are loaded p2', r));
  Promise.all([p1, p2]).then(r => {
    console.log('p1 and p2 are done');
    if (this.settings.selectedMsgKey) {
      console.log('loaded p1, p2 in if, key: ', this.settings.selectedMsgKey);
      let key = this.settings.selectedMsgKey;
      let idx = this.messages.$indexFor(key);
      this.selectedMsg = this.messages[idx];
      $scope.$apply();            
    } else if (this.messages.length){
      console.log('loaded p1, p2 in else if');
      this.selectedMsg = this.messages[0];
      this.settings.selectedMsgKey = this.messages[0].$id;
      this.settings.$save();
  } else {
      console.log('loaded p1, p2 in else');
      let newMsg = {
        title: 'New Title',
        content: 'First Msg content',
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }
      this.messages.$add(newMsg).then(r => {
        let key = r.key;
        this.selectedMsg = this.messages.$getRecord(key);
        this.settings.selectedMsgKey = key;
        this.settings.$save();
      });
    }
  });

  this.logData = () => {
    console.log('settings: ', this.settings);
    console.log('messages: ', this.messages);
    console.log('message at [1]: ', this.messages[1]);
    console.log('messages length: ' + this.messages.length);
    console.log('date.now', Date.now() );
  }
  this.newMsg = () => {
    let newMsg = {
      title: 'New Title',
      content: 'First Msg content',
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }
    // let newKey = this.messages.$add(newMsg);
    this.messages.$add(newMsg).then(r => {
      console.log('added new Msg complete', r);
      let key = r.key;
      this.selectedMsg = this.messages.$getRecord(key);
      this.settings.selectedMsgKey = key;
      this.settings.$save();
    });
    }
  this.selectMsg = msg => {
    console.log('running selectMessage: ' + msg.$id);
    this.selectedMsg = msg;
    this.settings.selectedMsgKey = msg.$id;
    this.settings.$save();
  }

  this.updateMsg = () => {
    console.log('will update message: ', this.selectedMsg);
    this.messages.$save(this.selectedMsg);
  }

  

  
});