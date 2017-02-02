angular.module('Eggly', [

])
    .controller('MainCtrl', function ($scope) {
        $scope.clubs = [
            {"id": 0, "name": "Phoenix"},
            {"id": 1, "name": "Glendale"},
            {"id": 2, "name": "Mesa"},
            {"id": 3, "name": "Scottsdale"}
        ];

        $scope.members = [
            {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "club": "Phoenix" },
            {"id": 1, "title": "Egghead.io", "url": "http://angularjs.org", "club": "Phoenix" },
            {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "club": "Glendale" },
            {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "club": "Glendale" },
            {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "club": "Mesa" },
            {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "club": "Mesa" },
            {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "club": "Scottsdale" },
            {"id": 7, "title": "Wimp", "url": "http://wimp.com", "club": "Scottsdale" },
            {"id": 8, "title": "Dump", "url": "http://dump.com", "club": "Scottsdale" }
        ];

        $scope.isCreating = false;
        $scope.isEditing = false;
        $scope.currentclub = null;
        $scope.editedmember = null;

        function isCurrentclub(club) {
            return $scope.currentclub !== null && club.name === $scope.currentclub.name;
        }

        function setCurrentclub(club) {
            $scope.currentclub = club;

            cancelCreating();
            cancelEditing();
        }

        $scope.isCurrentclub = isCurrentclub;
        $scope.setCurrentclub = setCurrentclub;

        function setEditedmember(member) {
            $scope.editedmember = angular.copy(member);
        }

        function isSelectedmember(memberId) {
            return $scope.editedmember !== null && $scope.editedmember.id === memberId;
        }

        $scope.setEditedmember = setEditedmember;
        $scope.isSelectedmember = isSelectedmember;

        function resetCreateForm() {
            $scope.newmember = {
                title: '',
                url: '',
                club: $scope.currentclub
            };
        }

        //-------------------------------------------------------------------------------------------------
        // CRUD
        //-------------------------------------------------------------------------------------------------
        function createmember(member) {
            member.id = $scope.members.length;
            $scope.members.push(member);

            resetCreateForm();
        }

        function updatemember(member) {
            var index = _.findIndex($scope.members, function (b) {
                return b.id == member.id
            });
            $scope.members[index] = member;

            $scope.editedmember = null;
            $scope.isEditing = false;
        }

        $scope.createmember = createmember;
        $scope.updatemember = updatemember;

        //-------------------------------------------------------------------------------------------------
        // CREATING AND EDITING STATES
        //-------------------------------------------------------------------------------------------------
        function shouldShowCreating() {
            return $scope.currentclub && !$scope.isEditing;
        }

        function startCreating() {
            $scope.isCreating = true;
            $scope.isEditing = false;
            resetCreateForm();
        }

        function cancelCreating() {
            $scope.isCreating = false;
        }

        $scope.shouldShowCreating = shouldShowCreating;
        $scope.startCreating = startCreating;
        $scope.cancelCreating = cancelCreating;

        function shouldShowEditing() {
            return $scope.isEditing && !$scope.isCreating;
        }

        function startEditing() {
            $scope.isCreating = false;
            $scope.isEditing = true;
        }

        function cancelEditing() {
            $scope.isEditing = false;
            $scope.editedmember = null;
        }

        $scope.startEditing = startEditing;
        $scope.cancelEditing = cancelEditing;
        $scope.shouldShowEditing = shouldShowEditing;
    })
;