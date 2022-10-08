import React, { useEffect } from 'react';
import _ from 'underscore';
import * as moment from "moment";
import $ from 'jquery';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';




const GoogleTranslate = () => {

    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({ pageLanguage: 'en', 
     // includedLanguages: 'bg,bs,ca,co,zh-CN,cs,cy,da,de,el,en,es,et,fa,fi,fr,fy,ga,gd,gl,he,hu,iw,is,it,ka,la,lb,lt,lv,mk,nl,no,pl,pt,ro,ru,sk,sl,sq,sr,sv,tr,uk,zh',
     includedLanguages: 'en,es,ta',
     layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element')
     }
     
     useEffect(() => {
       var addScript = document.createElement('script');
       addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
       document.body.appendChild(addScript);
       window.googleTranslateElementInit = googleTranslateElementInit;
     }, [])
   
     return (
       <div>
        {/* <h2 className="title gx-mb-4"><IntlMessages id="sidebar.samplePage"/></h2> */}
         <div id="google_translate_element"></div>
         <div className="gx-d-flex justify-content-center">
         </div>
   
       </div>
     );
   };
   
   export default GoogleTranslate

   /*
   LANGUAGE SUPPORT IN GOOGLE

   Language	ISO-639-1 Code
Afrikaans	af
Albanian	sq
Amharic	am
Arabic	ar
Armenian	hy
Azerbaijani	az
Basque	eu
Belarusian	be
Bengali	bn
Bosnian	bs
Bulgarian	bg
Catalan	ca
Cebuano	ceb (ISO-639-2)
Chinese (Simplified)	zh-CN or zh (BCP-47)
Chinese (Traditional)	zh-TW (BCP-47)
Corsican	co
Croatian	hr
Czech	cs
Danish	da
Dutch	nl
English	en
Esperanto	eo
Estonian	et
Finnish	fi
French	fr
Frisian	fy
Galician	gl
Georgian	ka
German	de
Greek	el
Gujarati	gu
Haitian Creole	ht
Hausa	ha
Hawaiian	haw (ISO-639-2)
Hebrew	he or iw
Hindi	hi
Hmong	hmn (ISO-639-2)
Hungarian	hu
Icelandic	is
Igbo	ig
Indonesian	id
Irish	ga
Italian	it
Japanese	ja
Javanese	jv
Kannada	kn
Kazakh	kk
Khmer	km
Kinyarwanda	rw
Korean	ko
Kurdish	ku
Kyrgyz	ky
Lao	lo
Latvian	lv
Lithuanian	lt
Luxembourgish	lb
Macedonian	mk
Malagasy	mg
Malay	ms
Malayalam	ml
Maltese	mt
Maori	mi
Marathi	mr
Mongolian	mn
Myanmar (Burmese)	my
Nepali	ne
Norwegian	no
Nyanja (Chichewa)	ny
Odia (Oriya)	or
Pashto	ps
Persian	fa
Polish	pl
Portuguese (Portugal, Brazil)	pt
Punjabi	pa
Romanian	ro
Russian	ru
Samoan	sm
Scots Gaelic	gd
Serbian	sr
Sesotho	st
Shona	sn
Sindhi	sd
Sinhala (Sinhalese)	si
Slovak	sk
Slovenian	sl
Somali	so
Spanish	es
Sundanese	su
Swahili	sw
Swedish	sv
Tagalog (Filipino)	tl
Tajik	tg
Tamil	ta
Tatar	tt
Telugu	te
Thai	th
Turkish	tr
Turkmen	tk
Ukrainian	uk
Urdu	ur
Uyghur	ug
Uzbek	uz
Vietnamese	vi
Welsh	cy
Xhosa	xh
Yiddish	yi
Yoruba	yo
Zulu	zu

*/