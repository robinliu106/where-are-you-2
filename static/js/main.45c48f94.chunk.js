(this["webpackJsonpwhere-are-you-2"]=this["webpackJsonpwhere-are-you-2"]||[]).push([[0],{45:function(t,n,a){},66:function(t,n,a){"use strict";a.r(n);var c={};a.r(c),a.d(c,"generateRandomPoint",(function(){return E})),a.d(c,"calculateDistance",(function(){return w})),a.d(c,"shuffleArray",(function(){return N})),a.d(c,"pickRandomCity",(function(){return L})),a.d(c,"isNaN",(function(){return R}));var o,i=a(0),r=a(13),e=a.n(r),u=a(3),y=a(32),s=a(15),l=a.n(s),d=a(24),b=a(12),g=(a(45),a(28)),h=a.n(g),m=a(5),j=a(36),S=a.n(j),O=(a(53),a(37),a(23)),p=Object(O.b)({name:"game",initialState:{score:0,stage:1,activeRound:!0,cityCoords:{},markerCoords:{}},reducers:{updateScore:function(t,n){t.score+=n.payload},updateCity:function(t,n){t.cityCoords=n.payload},updateMarker:function(t,n){t.markerCoords=n.payload},updateStage:function(t){t.stage+=1},setActiveRound:function(t,n){t.activeRound=n.payload}}}),f=p.actions,v=f.updateScore,C=f.updateCity,M=f.updateMarker,A=f.updateStage,P=(f.setActiveRound,function(t){return t.game.score}),k=function(t){return t.game.stage},T=function(t){return t.game.cityCoords},x=function(t){return t.game.markerCoords},_=p.reducer,B=a(1),E=function(t,n){var a=t.lng,c=t.lat,o=n/111300,i=Math.random(),r=Math.random(),e=o*Math.sqrt(i),u=2*Math.PI*r,y=e*Math.cos(u),s=e*Math.sin(u),l=y/Math.cos(c);return{lat:parseFloat((s+c).toFixed(6)),lng:parseFloat((l+a).toFixed(6))}},w=function(t,n,a,c){function o(t){return t*(Math.PI/180)}function i(t){return Math.pow(t,2)}t=o(t);var r=(a=o(a))-t,e=o(c-n),u=i(Math.sin(r/2))+Math.cos(t)*Math.cos(a)*i(Math.sin(e/2));return(.621371*(12742*Math.asin(Math.sqrt(u)))).toFixed(2)},N=function(t){for(var n=t.length-1;n>0;n--){var a=Math.floor(Math.random()*n),c=t[n];t[n]=t[a],t[a]=c}return t},L=function(t){return t[Math.floor(Math.random()*t.length)]},R=function(t){var n=Number(t);return n!==n},D=[{country:"Afghanistan",city:"Kabul"},{country:"Albania",city:"Tirana"},{country:"Algeria",city:"Alger"},{country:"American Samoa",city:"Fagatogo"},{country:"Andorra",city:"Andorra la Vella"},{country:"Angola",city:"Luanda"},{country:"Anguilla",city:"The Valley"},{country:"Antigua and Barbuda",city:"Saint John's"},{country:"Argentina",city:"Buenos Aires"},{country:"Armenia",city:"Yerevan"},{country:"Aruba",city:"Oranjestad"},{country:"Australia",city:"Canberra"},{country:"Austria",city:"Wien"},{country:"Azerbaijan",city:"Baku"},{country:"Bahamas",city:"Nassau"},{country:"Bahrain",city:"al-Manama"},{country:"Bangladesh",city:"Dhaka"},{country:"Barbados",city:"Bridgetown"},{country:"Belarus",city:"Minsk"},{country:"Belgium",city:"Bruxelles [Brussel]"},{country:"Belize",city:"Belmopan"},{country:"Benin",city:"Porto-Novo"},{country:"Bermuda",city:"Hamilton"},{country:"Bhutan",city:"Thimphu"},{country:"Bolivia",city:"La Paz"},{country:"Bosnia and Herzegovina",city:"Sarajevo"},{country:"Botswana",city:"Gaborone"},{country:"Brazil",city:"Bras\xedlia"},{country:"Brunei",city:"Bandar Seri Begawan"},{country:"Bulgaria",city:"Sofia"},{country:"Burkina Faso",city:"Ouagadougou"},{country:"Burundi",city:"Bujumbura"},{country:"Cambodia",city:"Phnom Penh"},{country:"Cameroon",city:"Yaound"},{country:"Canada",city:"Ottawa"},{country:"Cape Verde",city:"Praia"},{country:"Cayman Islands",city:"George Town"},{country:"Central African Republic",city:"Bangui"},{country:"Chad",city:"N'Djam"},{country:"Chile",city:"Santiago de Chile"},{country:"China",city:"Peking"},{country:"Christmas Island",city:"Flying Fish Cove"},{country:"Cocos (Keeling) Islands",city:"West Island"},{country:"Colombia",city:"Santaf"},{country:"Comoros",city:"Moroni"},{country:"Congo",city:"Brazzaville"},{country:"Cook Islands",city:"Avarua"},{country:"Costa Rica",city:"San Jos"},{country:"Croatia",city:"Zagreb"},{country:"Cuba",city:"La Habana"},{country:"Cyprus",city:"Nicosia"},{country:"Czech Republic",city:"Praha"},{country:"Denmark",city:"Copenhagen"},{country:"Djibouti",city:"Djibouti"},{country:"Dominica",city:"Roseau"},{country:"Dominican Republic",city:"Santo Domingo de Guzm"},{country:"East Timor",city:"Dili"},{country:"Ecuador",city:"Quito"},{country:"Egypt",city:"Cairo"},{country:"El Salvador",city:"San Salvador"},{country:"England",city:"London"},{country:"Equatorial Guinea",city:"Malabo"},{country:"Eritrea",city:"Asmara"},{country:"Estonia",city:"Tallinn"},{country:"Ethiopia",city:"Addis Abeba"},{country:"Falkland Islands",city:"Stanley"},{country:"Faroe Islands",city:"T\xf3rshavn"},{country:"Fiji Islands",city:"Suva"},{country:"Finland",city:"Helsinki [Helsingfors]"},{country:"France",city:"Paris"},{country:"French Guiana",city:"Cayenne"},{country:"French Polynesia",city:"Papeete"},{country:"Gabon",city:"Libreville"},{country:"Gambia",city:"Banjul"},{country:"Georgia",city:"Tbilisi"},{country:"Germany",city:"Berlin"},{country:"Ghana",city:"Accra"},{country:"Gibraltar",city:"Gibraltar"},{country:"Greece",city:"Athenai"},{country:"Greenland",city:"Nuuk"},{country:"Grenada",city:"Saint George's"},{country:"Guadeloupe",city:"Basse-Terre"},{country:"Guam",city:"Aga"},{country:"Guatemala",city:"Ciudad de Guatemala"},{country:"Guinea",city:"Conakry"},{country:"Guinea-Bissau",city:"Bissau"},{country:"Guyana",city:"Georgetown"},{country:"Haiti",city:"Port-au-Prince"},{country:"Holy See (Vatican City State)",city:"Citt"},{country:"Honduras",city:"Tegucigalpa"},{country:"Hong Kong",city:"Victoria"},{country:"Hungary",city:"Budapest"},{country:"Iceland",city:"Reykjav"},{country:"India",city:"New Delhi"},{country:"Indonesia",city:"Jakarta"},{country:"Iran",city:"Tehran"},{country:"Iraq",city:"Baghdad"},{country:"Ireland",city:"Dublin"},{country:"Israel",city:"Jerusalem"},{country:"Italy",city:"Roma"},{country:"Ivory Coast",city:"Yamoussoukro"},{country:"Jamaica",city:"Kingston"},{country:"Japan",city:"Tokyo"},{country:"Jordan",city:"Amman"},{country:"Kazakhstan",city:"Astana"},{country:"Kenya",city:"Nairobi"},{country:"Kiribati",city:"Bairiki"},{country:"Kuwait",city:"Kuwait"},{country:"Kyrgyzstan",city:"Bishkek"},{country:"Laos",city:"Vientiane"},{country:"Latvia",city:"Riga"},{country:"Lebanon",city:"Beirut"},{country:"Lesotho",city:"Maseru"},{country:"Liberia",city:"Monrovia"},{country:"Libyan Arab Jamahiriya",city:"Tripoli"},{country:"Liechtenstein",city:"Vaduz"},{country:"Lithuania",city:"Vilnius"},{country:"Luxembourg",city:"Luxembourg [Luxemburg/L"},{country:"Macao",city:"Macao"},{country:"North Macedonia",city:"Skopje"},{country:"Madagascar",city:"Antananarivo"},{country:"Malawi",city:"Lilongwe"},{country:"Malaysia",city:"Kuala Lumpur"},{country:"Maldives",city:"Male"},{country:"Mali",city:"Bamako"},{country:"Malta",city:"Valletta"},{country:"Marshall Islands",city:"Dalap-Uliga-Darrit"},{country:"Martinique",city:"Fort-de-France"},{country:"Mauritania",city:"Nouakchott"},{country:"Mauritius",city:"Port-Louis"},{country:"Mayotte",city:"Mamoutzou"},{country:"Mexico",city:"Ciudad de M"},{country:"Micronesia, Federated States of",city:"Palikir"},{country:"Moldova",city:"Chisinau"},{country:"Monaco",city:"Monaco-Ville"},{country:"Mongolia",city:"Ulan Bator"},{country:"Montenegro",city:"Podgorica"},{country:"Montserrat",city:"Plymouth"},{country:"Morocco",city:"Rabat"},{country:"Mozambique",city:"Maputo"},{country:"Myanmar",city:"Rangoon (Yangon)"},{country:"Namibia",city:"Windhoek"},{country:"Nauru",city:"Yaren"},{country:"Nepal",city:"Kathmandu"},{country:"Netherlands",city:"Amsterdam"},{country:"Netherlands Antilles",city:"Willemstad"},{country:"New Caledonia",city:"Noum"},{country:"New Zealand",city:"Wellington"},{country:"Nicaragua",city:"Managua"},{country:"Niger",city:"Niamey"},{country:"Nigeria",city:"Abuja"},{country:"Niue",city:"Alofi"},{country:"Norfolk Island",city:"Kingston"},{country:"North Korea",city:"Pyongyang"},{country:"Northern Ireland",city:"Belfast"},{country:"Northern Mariana Islands",city:"Garapan"},{country:"Norway",city:"Oslo"},{country:"Oman",city:"Masqat"},{country:"Pakistan",city:"Islamabad"},{country:"Palau",city:"Koror"},{country:"Palestine",city:"Gaza"},{country:"Panama",city:"Ciudad de Panam"},{country:"Papua New Guinea",city:"Port Moresby"},{country:"Paraguay",city:"Asunci"},{country:"Peru",city:"Lima"},{country:"Philippines",city:"Manila"},{country:"Pitcairn",city:"Adamstown"},{country:"Poland",city:"Warszawa"},{country:"Portugal",city:"Lisboa"},{country:"Puerto Rico",city:"San Juan"},{country:"Qatar",city:"Doha"},{country:"Reunion",city:"Saint-Denis"},{country:"Romania",city:"Bucuresti"},{country:"Russian Federation",city:"Moscow"},{country:"Rwanda",city:"Kigali"},{country:"Saint Helena",city:"Jamestown"},{country:"Saint Kitts and Nevis",city:"Basseterre"},{country:"Saint Lucia",city:"Castries"},{country:"Saint Pierre and Miquelon",city:"Saint-Pierre"},{country:"Saint Vincent and the Grenadines",city:"Kingstown"},{country:"Samoa",city:"Apia"},{country:"San Marino",city:"San Marino"},{country:"Sao Tome and Principe",city:"S"},{country:"Saudi Arabia",city:"Riyadh"},{country:"Scotland",city:"Edinburgh"},{country:"Senegal",city:"Dakar"},{country:"Serbia",city:"Belgrade"},{country:"Seychelles",city:"Victoria"},{country:"Sierra Leone",city:"Freetown"},{country:"Singapore",city:"Singapore"},{country:"Slovakia",city:"Bratislava"},{country:"Slovenia",city:"Ljubljana"},{country:"Solomon Islands",city:"Honiara"},{country:"Somalia",city:"Mogadishu"},{country:"South Africa",city:"Pretoria"},{country:"South Korea",city:"Seoul"},{country:"South Sudan",city:"Juba"},{country:"Spain",city:"Madrid"},{country:"Sudan",city:"Khartum"},{country:"Suriname",city:"Paramaribo"},{country:"Svalbard and Jan Mayen",city:"Longyearbyen"},{country:"Swaziland",city:"Mbabane"},{country:"Sweden",city:"Stockholm"},{country:"Switzerland",city:"Bern"},{country:"Syria",city:"Damascus"},{country:"Tajikistan",city:"Dushanbe"},{country:"Tanzania",city:"Dodoma"},{country:"Thailand",city:"Bangkok"},{country:"The Democratic Republic of Congo",city:"Kinshasa"},{country:"Togo",city:"Lom\xe9"},{country:"Tokelau",city:"Fakaofo"},{country:"Tonga",city:"Nuku'alofa"},{country:"Trinidad and Tobago",city:"Port-of-Spain"},{country:"Tunisia",city:"Tunis"},{country:"Turkey",city:"Ankara"},{country:"Turkmenistan",city:"Ashgabat"},{country:"Turks and Caicos Islands",city:"Cockburn Town"},{country:"Tuvalu",city:"Funafuti"},{country:"Uganda",city:"Kampala"},{country:"Ukraine",city:"Kyiv"},{country:"United Arab Emirates",city:"Abu Dhabi"},{country:"United Kingdom",city:"London"},{country:"United States",city:"Washington"},{country:"Uruguay",city:"Montevideo"},{country:"Uzbekistan",city:"Toskent"},{country:"Vanuatu",city:"Port-Vila"},{country:"Venezuela",city:"Caracas"},{country:"Vietnam",city:"Hanoi"},{country:"Virgin Islands, British",city:"Road Town"},{country:"Virgin Islands, U.S.",city:"Charlotte Amalie"},{country:"Wales",city:"Cardiff"},{country:"Wallis and Futuna",city:"Mata-Utu"},{country:"Western Sahara",city:"El-Aai"},{country:"Yemen",city:"Sanaa"},{country:"Zambia",city:"Lusaka"},{country:"Zimbabwe",city:"Harare"}],K=a(11),I={height:"100vh",width:"70vw"},F=function(){var t=Object(m.c)(T);return Object(B.jsx)("div",{className:"street-view-map",children:Object(B.jsx)(K.c,{googleMapsApiKey:Object({NODE_ENV:"production",PUBLIC_URL:"/where-are-you-2",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_GOOGLE_MAPS_API_KEY,children:Object(B.jsx)(K.a,{mapContainerStyle:I,zoom:7,initialCenter:{lat:42.3517071,lng:-71.0691937},children:Object(B.jsx)(K.f,{position:t,visible:!0,options:{disableDefaultUI:!0,enableCloseButton:!1},onVisibleChanged:function(){return console.log("visible changed")}})})})})},G={height:"50vh",width:"30vw"},H=function(t){var n=t.polyLineCoords,a=t.currentPlace,c=t.actualDistance,o=Object(i.useState)(null),r=Object(b.a)(o,2),e=r[0],u=r[1],y=Object(i.useState)({lat:42.3517071,lng:-71.0691937}),s=Object(b.a)(y,2),l=s[0],d=s[1],g=Object(m.c)(T),h=Object(m.c)(x),j=Object(m.b)(),S=function(t){var n=t.latLng.toJSON(),a=n.lat,c=n.lng;j(M({lat:a,lng:c}))};return Object(B.jsx)("div",{children:Object(B.jsx)(K.c,{googleMapsApiKey:Object({NODE_ENV:"production",PUBLIC_URL:"/where-are-you-2",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_GOOGLE_MAPS_API_KEY,children:Object(B.jsxs)(K.a,{onLoad:function(t){return u(t)},mapContainerStyle:G,zoom:1,center:l,onDragEnd:function(){if(e){var t=e.getCenter().toJSON(),n=t.lat,a=t.lng;d({lat:n,lng:a})}},onClick:function(t){return S(t)},children:[h?Object(B.jsx)(K.d,{draggable:!0,position:h,onDragEnd:function(t){return S(t)}}):null,n?Object(B.jsx)(K.e,{path:n}):null,n?Object(B.jsx)(K.b,{position:g,children:Object(B.jsx)("div",{children:"Distance to: ".concat(a.city,", ").concat(a.country," is ").concat(c," miles")})}):null]})})})},z=a(38),V=a(40),W=a(39),U=a.n(W),J=Object(V.a)(o||(o=Object(z.a)(["\n    display: block;\n    margin: 0 auto;\n    border-color: red;\n"]))),Y=function(t){t.loading;return Object(B.jsx)("div",{className:"sweet-loading",children:Object(B.jsx)(U.a,{color:"#ffffff",loading:!0,css:J,size:150})})};h.a.setApiKey(Object({NODE_ENV:"production",PUBLIC_URL:"/where-are-you-2",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_GOOGLE_MAPS_API_KEY);var q=function(){var t=Object(m.c)(P),n=Object(m.c)(k),a=Object(m.c)(T),o=Object(m.c)(x),r=Object(m.b)(),e=Object(i.useState)(),u=Object(b.a)(e,2),s=u[0],g=u[1],j=Object(i.useState)(),O=Object(b.a)(j,2),p=O[0],f=O[1],_=Object(i.useState)(),N=Object(b.a)(_,2),K=N[0],I=N[1],G=Object(i.useState)(!0),z=Object(b.a)(G,2),V=z[0],W=z[1],U=Object(i.useState)(),J=Object(b.a)(U,2),q=J[0],Z=J[1],Q=Object(i.useState)(),X=Object(b.a)(Q,2),$=X[0],tt=X[1];Object(i.useEffect)((function(){nt()}),[]);var nt=function(){var t=Object(d.a)(l.a.mark((function t(){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(tt(!0),!q){t.next=6;break}r(C(q)),console.log("next city cache exists, using",q),t.next=11;break;case 6:return t.next=8,at();case 8:return n=t.sent,t.next=11,r(C(n));case 11:return t.next=13,at();case 13:return a=t.sent,t.next=16,Z(a);case 16:tt(!1),console.log("next city is set",a);case 18:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),at=function(){var t=Object(d.a)(l.a.mark((function t(){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=null,console.log("-------------------------"),t.prev=2,t.next=5,S()(function(){var t=Object(d.a)(l.a.mark((function t(a){var c,o,i,r,e,u,y,s,d;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=L(D),o=c.country,i=c.city,g({country:o,city:i}),console.log("current place",i,o),t.next=5,h.a.fromAddress("".concat(i,", ").concat(o));case 5:return r=t.sent,console.log("res",r),t.next=9,r.results[0].geometry.location;case 9:return e=t.sent,u=e.lat,y=e.lng,n=E({lat:u,lng:y},100),console.log("randomPoint",n),t.next=16,fetch("https://maps.googleapis.com/maps/api/streetview/metadata?key=".concat(Object({NODE_ENV:"production",PUBLIC_URL:"/where-are-you-2",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_GOOGLE_MAPS_API_KEY,"&location=").concat(n.lat,",").concat(n.lng,"&return_error_codes=true&radius=100&source=outdoor"));case 16:return s=t.sent,t.next=19,s.json();case 19:if("OK"===(d=t.sent).status){t.next=22;break}throw"error";case 22:console.log("streetViewResponse",d);case 23:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),{retries:20});case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(2),console.log("pick new city error:",t.t0);case 10:return t.abrupt("return",n);case 11:case"end":return t.stop()}}),t,null,[[2,7]])})));return function(){return t.apply(this,arguments)}}(),ct=function(t){var n=0;t<10?n+=1e3:t<50?n+=500:t<200?n+=400:t<1e3?n+=300:t<5e3?n+=200:t<1e4&&(n+=100),r(v(n))},ot=function(){return Object(B.jsx)("p",{class:"lead",children:"Stage ".concat(n)})},it=function(){return Object(B.jsx)("p",{class:"lead",children:"Score: ".concat(t)})};return Object(B.jsxs)("div",{className:"container",children:[Object(B.jsx)(F,{}),Object(B.jsxs)("div",{className:"info-section",children:[Object(B.jsxs)("div",{className:"info-section__top",children:[Object(B.jsx)("h1",{className:"display-2",children:"Where are you?"}),Object(B.jsxs)("div",{className:"info-box",children:[Object(B.jsx)(ot,{}),Object(B.jsx)(it,{})]}),Object(B.jsx)(H,{polyLineCoords:p,currentPlace:s,actualDistance:K})]}),Object(B.jsxs)("div",{className:"info-section__bottom",children:[Object(B.jsx)("button",{className:"btn btn-outline-primary",onClick:function(){if(o){f([a,o]);var t=w.apply(c,Object(y.a)(Object.values(a)).concat(Object(y.a)(Object.values(o))));t&&!R(t)&&(console.log("actual distance",t),I(t),ct(t)),W(!1)}else console.log("marker was not placed, zero points")},disabled:!V,children:"Submit"}),Object(B.jsxs)("button",{className:"btn btn-outline-success",id:"next_button",onClick:function(){r(M(null)),f(null),I(null),W(!0),nt(),r(A())},children:[$?"Loading":"Next City",$?Object(B.jsx)(Y,{loading:!0}):null]})]})]})]})},Z=function(){return Object(B.jsx)("div",{children:Object(B.jsx)(u.c,{children:Object(B.jsx)(u.a,{path:"/",component:q,exact:!0})})})},Q=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,68)).then((function(n){var a=n.getCLS,c=n.getFID,o=n.getFCP,i=n.getLCP,r=n.getTTFB;a(t),c(t),o(t),i(t),r(t)}))},X=Object(O.a)({reducer:{game:_}}),$=a(27);e.a.render(Object(B.jsx)($.a,{forceRefresh:!0,children:Object(B.jsx)(m.a,{store:X,children:Object(B.jsx)(Z,{})})}),document.getElementById("root")),Q()}},[[66,1,2]]]);
//# sourceMappingURL=main.45c48f94.chunk.js.map