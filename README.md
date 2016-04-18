# ScrollingAnchors jQuery plugin
Позволяет удобно обрабатывать события прокрутки документа по средствам якорей и диапазонов расставленных по странице.
Вы расставляете якоря и описываете действия для доспупных событий все остальное делает плагин.

#### Создание экземпляра класса
Функция конструктор принимает конфигурационный объект с массивом якорей (`anchors`) и диапазонов (`ranges`). Можно передать только один из них, либо не чего, 
но тогда и отслеживать будет нечего. Массив якорей представляет собой набор объектов с двумя обязательными полями `name` и `anchor`. 
`anchor` должен содержать jQuery объект с html узлом нутри. Массив диапазонов похож на массив якорей в массиве должны лежать объекты с двумя обязательными 
полями `name` и `range`. `range` содержит массив из двух jQuery объектов с html узлом внутри, первый узел в массиве range тот который находится выше по документу 
(`offsetTop` меньше).
```
	var anchors = [
			{
				name: "Home",
				anchor: $("#Home")
			},
			{
				name: "Main_functions",
				anchor: $("#Main_functions")
			},
			{
				name: "Equipment",
				anchor: $("#Equipment")
			},
			{
				name: "Characteristics",
				anchor: $("#Characteristics")
			},
			{
				name: "Features",
				anchor: $("#Features")
			},
			{
				name: "Reviews",
				anchor: $("#Reviews")
			},
			{
				name: "EndDoc",
				anchor: $("#EndDoc")
			}
		];
	var ranges = [
			{
				name: "Home-Main_functions",
				range: [$("#Home"),$("#Main_functions")]
			},
			{
				name: "Main_functions-Equipment",
				range: [$("#Main_functions"),$("#Equipment")]
			},
			{
				name: "Equipment-Characteristics",
				range: [$("#Equipment"),$("#Characteristics")]
			},
			{
				name: "Characteristics-Features",
				range: [$("#Characteristics"),$("#Features")]
			},
			{
				name: "Features-Reviews",
				range: [$("#Features"),$("#Reviews")]
			},
			{
				name: "Reviews-EndDoc",
				range: [$("#Reviews"),$("#EndDoc")]
			}
		];
			
	const ScrollingAnchors = require('./ScrollingAnchors');
	const scrollingAnchors = new ScrollingAnchors({
		anchors,
		ranges,
		parent: window
	});
```
Так же конструктор принимает ссылку на родительский dom узел. По умолчанию `parent` равен window, но вы можете передать любой dom узел на свое усмотрение.

#### Методы
1. `super.on(event, handler)` - Подписка на событие (метод класса). Первый аргумент event тип строка 
в формате: "имяСобытия:[anchors|ranges]:имяДиапазонаИлиАнкора". Второй аргумент функция.
	```
		scrollingAnchors.on("onTheScreen:ranges:Equipment-Characteristics", function() {
			console.log("Equipment-Characteristics Ranges on Screen!");
		});
	```
	
2. `@addListeners( handler )` - Принимает функцию которая будет вызываться каждый раз при событии onScroll.
	```
		scrollingAnchors.addListeners( ( data ) => {
			console.log( data );
		});
	```

#### События для anchors
1. `onTheScreen` - Вызывается один раз при появлении anchor в области видимости.
2. `notOnTheScreen` - Вызывается один раз при скрытии anchor из области видимости.
	```
		scrollingAnchors.on("onTheScreen:anchors:Equipment", function() {
			console.log("Last Anchor on Screen!");
		});

		scrollingAnchors.on("notOnTheScreen:anchors:Equipment", function() {
			console.log("Last Anchor NOT on Screen!");
		});
	```

#### События для ranges
1. `onTheScreen` - Диапазон на экране
2. `notOnTheScreen` - Диапазон не на экране
3. `top` - Весь диапазон или его верхняя граница находится выше области видимости экрана. Позиция возможно в случае ввидимости диапазона так и противоположном.
4. `cover` - Диапазон охватывает экран (больше размера экрана), верхняя и нижняя граница не видны, первая находится выше экрана, вторая ниже соответсвенно.
5. `middle` - Весь диапазон видно на экране.
6. `bottom` - Весь диапазон или его нижняя граница находится ниже области видимости экрана.
7. `mostNotable` - Диапазон является самым заметным т.е. диапазон у которого видимая часть самая большая из диапазонов на экране.
	```
		scrollingAnchors.on("onTheScreen:ranges:Equipment-Characteristics", function() {
			console.log("Equipment-Characteristics Ranges on Screen!");
		});

		scrollingAnchors.on("notOnTheScreen:ranges:Equipment-Characteristics", function() {
			console.log("Equipment-Characteristics Ranges NOT on Screen!");
		});

		scrollingAnchors.on("top:ranges:Equipment-Characteristics", function() {
			console.log("Equipment-Characteristics Ranges Top!");
		});

		scrollingAnchors.on("mostNotable:ranges:Equipment-Characteristics", function() {
			console.log("Equipment-Characteristics Ranges is most Notable!");
		});

		scrollingAnchors.addListeners( ( data ) => {
			console.log( data.mostNotableIndex );
		});
	```
