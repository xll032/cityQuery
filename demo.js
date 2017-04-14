var app = angular.module('query',[]);
console.log(app);
app.controller('myCtrl',function( $scope ){
	$scope.searchArr = [];
	$scope.selectArea = '';
	$scope.search = function(){
		var result = cityQuery($scope.val,'province','search');
		if(!result.length){
			result = cityQuery($scope.val,'city','get');
			if(!result.length){
				result = cityQuery($scope.val,'city','get');
			}
		}
		$scope.searchArr = result;
	};
	document.addEventListener('keydown',function(e){
		var ev = e || event;
		if(ev.keyCode == 13){
			document.getElementsByClassName('_btn')[0].click();
		}
	},false);
	//联动初始化
	$scope.initial = function(){
		$scope.province = cityQuery('','province','get');
		$scope.city = cityQuery('11','province','linkage');
		$scope.county = cityQuery('1101','city','linkage');
		$scope.selectPro = $scope.province[0][0];
		$scope.selectCit = $scope.city[0][0];
		$scope.selectCou = $scope.county[0][0];
		$scope.selectArea = [$scope.county[0][0],'北京市市辖区东城区'];
	};
	$scope.initial();
	//调用联动
	var pro,cit,cou;
	$scope.linkage = function(area){
		switch (area){
			case 'province':
				$scope.city = _linkage($scope.selectPro,area);
				$scope.selectCit = $scope.city[0][0];
				$scope.county = _linkage($scope.city[0][0],'city');
				$scope.selectCou = $scope.county[0][0];
				pro = _text('province',area);
				cit=$scope.city[0][1];
				cou=$scope.county[0][1];
				break;
			case 'city':
				$scope.county=_linkage($scope.selectCit,area);
				$scope.selectCou = $scope.county[0][0];
				cit=_text('city',area);
				cou=$scope.county[0][1];
				break;
			case 'county':
				cou = _text('county',area);
		}
		function _linkage(num,area){return cityQuery(num,area,'linkage');}
		function _text(ar,area){ var _this = document.getElementById(ar);return (ar==area) ? _this.options[_this.selectedIndex].innerText : _this.options[0].innerText;}

		$scope.selectArea = [$scope.selectCou,pro+cit+cou];
	};
});