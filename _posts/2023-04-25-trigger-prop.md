---
layout: post
title:  "제이쿼리 라이브러리에서 제공하는 trigger와 prop 함수의 사용법과 차이점을 알아보자"
date:   2023-04-25 00:00:00 +0700
redirect_from:
  - /common/javascript/2023/04/24/trigger-prop.html
categories: [javascript]
---

### trigger 함수

<br />
##### trigger 함수는 jQuery 라이브러리에서 제공하는 함수 중 하나이고
##### 이 함수는 특정 DOM 요소에 이벤트를 강제로 발생시킬 수 있습니다.

<br />
아래는 함수 사용 예시이다.

<br />
~~~
$(selector).trigger(eventType, eventData);
~~~

<br />
* selector: 이벤트를 발생시킬 DOM 요소를 선택하는 선택자입니다.
* eventType: 발생시킬 이벤트의 종류를 지정합니다. 예를 들어 'click', 'keydown', 'customEvent' 등이 될 수 있습니다.
* eventData: 이벤트와 함께 전달할 데이터를 지정합니다. 이 인자는 생략 가능합니다.

<br />
~~~
// 예제 코드
$('#myButton').trigger('click');
~~~

<br />
##### 위 예제 코드에서는 #myButton이라는 ID를 가진 버튼 요소에 click 이벤트를 강제로 발생시키고 있습니다.

<br />
### prop 함수

<br />
##### jQuery의 prop 함수는 HTML 요소의 프로퍼티 값을 가져오거나 설정할 때 사용됩니다. 
##### 예를 들어, 체크박스 요소의 체크 상태를 가져오거나 설정할 때 사용됩니다. 

<br />
~~~
// 프로퍼티 값을 가져오는 경우
$(selector).prop(propertyName);

// 프로퍼티 값을 설정하는 경우
$(selector).prop(propertyName, value);
~~~

<br />
* selector: 프로퍼티 값을 가져오거나 설정할 HTML 요소를 선택하는 선택자입니다.
* propertyName: 가져오거나 설정할 프로퍼티의 이름입니다.
* value: 설정할 프로퍼티의 값입니다. 이 인자는 생략 가능합니다.

<br />
~~~
// 예제 코드
// 체크박스 요소의 체크 상태를 가져오는 경우
var isChecked = $('#myCheckbox').prop('checked');

// 체크박스 요소의 체크 상태를 설정하는 경우
$('#myCheckbox').prop('checked', true);
~~~

<br />
##### 위 예제 코드에서는 #myCheckbox이라는 ID를 가진 체크박스 요소의 체크 상태를 가져오거나 설정하는 방법을 보여주고 있습니다.