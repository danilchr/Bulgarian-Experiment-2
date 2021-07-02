PennController.ResetPrefix(null); // Shorten command names (keep this line here)

number_of_experiment=2

number_of_experiment_as_string=number_of_experiment.toString()


experiment_path="https://ibexfarm.ung.si/uporabniki/dk0035/experiment"+number_of_experiment_as_string+'/';

experiment_path
stimuli_path=experiment_path+'stimuli/';
zip_folder_path=stimuli_path+'zip_folder/';
zip_file_path=zip_folder_path+'zipped_stimuli_mono.zip'
    
//var type_of_experiment ="test-short";
//var type_of_experiment ="test-full";
    
var type_of_experiment ="pilot";
//var type_of_experiment ="main";

var progressBarText = "прогрес";
var stimuli_csv_table="design_final.csv";
//Template("test_csv"
var message_for_the_type_of_experiment = "";

if (type_of_experiment=="pilot")
{
  message_for_the_type_of_experiment = "Пилотен проект на експеримент "+number_of_experiment_as_string;
  stimuli_csv_table="design_final.csv";
  results_path=experiment_path+'pilot/';

}
else if (type_of_experiment=="test-short")
{
  message_for_the_type_of_experiment = "Кратък тест на експеримент "+number_of_experiment_as_string;
  stimuli_csv_table="test.csv";   
  results_path=experiment_path+'short_test/';

}

else if (type_of_experiment=="test-full")
{
  message_for_the_type_of_experiment = "Пълен тест на експеримент "+number_of_experiment_as_string;
  stimuli_csv_table="design_final.csv";
  results_path=experiment_path+'long_test/';

}


else
{
  message_for_the_type_of_experiment = "Експеримент "+number_of_experiment_as_string;
  stimuli_csv_table="design_final.csv";
  results_path=experiment_path+'main_experiment/';

    
}

results_path=results_path;

////php_file_path="https://vecjezicnost.ung.si/BGexp1/mediarec.php;
php_file_path=results_path+'mediarec.php';



var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c=>{
  const r = Math.random() * 16 | 0,v = c == 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});
Header(
  // void
)
.log("uniqueID", id);


///////AddHost("http://sabotin.ung.si/~astepanov/SLO_COMP_audio/")
///////AddHost("http://sabotin.ung.si/~astepanov/ru_wh_pictures/")

///////AddHost("https://sabotin.ung.si/~dk0035/");
///////AddHost("https://ibexfarm.ung.si/uporabniki/dk0035/private/experiment2/stimuli/")
AddHost(stimuli_path)



//////////PreloadZip("https://sabotin.ung.si/~dk0035/zipped_stimuli_mono.zip")
//////////PreloadZip(zip_file_path)

    

//Sequence("finished");
Sequence("intro", "intro1",  "demo", "trials",  "demo1",  "demo2", "expbegin", sepWith("sendAsync", randomize("experiment")), "Sync", SendResults(), "bye");



////Sequence("intro", "intro1", "trials",  "demo1",  "demo2", "expbegin", sepWith("sendAsync", randomize("experiment")), "Sync", SendResults(), "bye")


////Sequence("expbegin", sepWith("sendAsync", randomize("experiment")))


//Sequence("intro", "intro1", "intro2", "trials", "demo1",  "demo2","Sync", SendResults(), "bye")
////("intro", "trials")

////Sequence("intro", "intro1", "demo",  "trials", "demo1",  "demo2","expbegin", sepWith("sendAsync", randomize("experiment")) ok
/////Sequence("intro", "intro1", "trials","demo1",  "demo2","expbegin", sepWith("sendAsync", randomize("experiment")))
///Sequence("intro", "intro1", "trials","preload_demo_label","preload_demo" , startsWith("demo1","demo2"),  "demo1",  "demo2","preload_trials_label","preload_trials",startsWith("experiment"), "expbegin", sepWith("sendAsync", randomize("experiment")), "Sync", SendResults(), "bye");


////////Sequence("intro", "intro1", "trials","preload_demo_label")
/////////InitiateRecorder("https://vecjezicnost.ung.si/media_rec/mediarec.php", "")
    
/////////InitiateRecorder("https://vecjezicnost.ung.si/BGexp1/mediarec.php", "Моля, регулирайте настройките на своя браузър, за да разрешите достъп до микрофона. След това натиснете връзката по-долу.")
/////////InitiateRecorder("http://sabotin.ung.si/~dk0035/tests", "Това е само тест. Не използвайте това при реалния експеримент, защото резултатите НЯМА да бъдат изпратени към сървъра.")


    
/////////InitiateRecorder("https://ibexfarm.ung.si/uporabniki/dk0035/experiment2/short_test_results/mediarec.php", "Това е тест на новата ситемата. Не използвайте това при реалния експеримент, защото резултатите НЯМА да бъдат изпратени към сървъра.")
/////////InitiateRecorder("https://ibexfarm.ung.si/uporabniki/dk0035/experiment2/short_test_results/mediarec.php", "Това е тест на новата ситемата. Не използвайте това при реалния експеримент, защото резултатите НЯМА да бъдат изпратени към сървъра.")

 //InitiateRecorder(php_file_path, "Това е тест на новата ситема, който има за цел да определи дали резулттатите се записват в съответната .php директория")
 InitiateRecorder(php_file_path, "Моля, регулирайте настройките на своя браузър, за да разрешите достъп до микрофона. След това натиснете връзката по-долу.")


    .label("intro");

UploadRecordings("sendAsync", "noblock");
UploadRecordings("Sync");

    let replaceConsentMic = ()=>{
            let consentLink = $(".PennController-PennController a.Message-continue-link");
            if (consentLink.length > 0 && consentLink[0].innerHTML.match(/^By clicking this link I understand that I grant this experiment's script access to my recording device/))
                consentLink.html("Давам съгласието си за използване на микрофона и за записване на гласа ми в този експеримент. ");
            else
                window.requestAnimationFrame( replaceConsentMic );
    };
    window.requestAnimationFrame( replaceConsentMic );



newTrial( "finished",
   exitFullscreen()
   ,
   newText("Благодарим Ви за интереса. Този експеримент приключи.")
       .css("width","40em")
       .css("padding-top","10%")
       .css("line-height","1.4")
       .print()
    
    ,

   newText("Това беше линкът към пилотния проект на експеримент 5. В момента се провежда основната версия експеримент 5. За да участвате в основната версия на експеримент 5, посетете линка "+"<a href=https://expt.pcibex.net/ibexexps/danilchr/experiment5_main_old_pc_ibex_final/experiment.html>https://expt.pcibex.net/ibexexps/danilchr/experiment5_main_old_pc_ibex_final/experiment.html</a>"+", като натиснете върху него или като го копирате в своя браузър.")
       //.css("width","40em")
       //.css("padding-top","10%")
       //.css("line-height","1.4")
       //.print()
       
        //,

   //newText("В момента има проблем със сървъра. Моля, върнете се към ексеперимента след 18 май. Благодаря.")
       //.css("width","40em")
       //.css("padding-top","10%")
       //.css("line-height","1.4")
       //.print()
    ,
    newButton("")
        //.print()
        .wait()
        
       );

       





newTrial("intro1",

    newText(message_for_the_type_of_experiment)
    .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .center()
    .print()
    ,
     
     //newText(experiment_path+'\n'+stimuli_path+'\n'+results_path+'\n'+php_file_path+'\n'+zip_folder_path+'\n'+zip_file_path)
    //.css("width","40em")
    //.css("line-height","1.4")
    ////.css("padding-top","40px")
    //.css("padding-bottom","20px")
    //.center()
    //.print()
    //,

    newText("Здравейте! В рамките на изследователски проект в Университета в Нова Горица, Словения и Университета в Женева, Швейцария изследваме как носителите на езика устно обработват изречения с различна дължина и сложност.")
    .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()

    ,

    newText("Експериментът отнема между 15 и 20 минути. Предоставените от Вас данни ще бъдат използвани само за целите на това научно изследване и няма да бъдат разпространявани неправомерно.")
    .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()
    ,
        
    
    newText("Вашата задача е да изслушате незавършени изречения, след това да ги довършите, като произнесете само последната дума. Всяко изречение може да се изслуша само веднъж.")
    .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()
    ,


    
    newText(`<i>Пример</i>:<br>
Вие чувате: Мартин беше построил красиви пясъчни<br>
Зададена дума: <i>замък</i><br>
Вие произнасяте: <i>замъци</i>`)
     .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()

    ,
      
    newText("Моля, използвайте формите, които звучат най-добре за Вас, когато завършвате изреченията. Следвайте интуицията си, без да обмисляте отговора си при изпълнението на задачата и без да използвате помощ от други източници.")
    .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()
    ,
      
     
    
    newText("Докато произнасяте последната дума, ще трябва да запишете гласа си, като използвате микрофона на компютъра си. За да запишете отговора си, натиснете върху бутон „Запис“. За да спрете записа, натиснете върху бутона „Стоп“.")
    .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()
    ,

    newText("За да можете да запишете гласа си, ще Ви е нужен работещ микрофон. Преди да продължите по-нататък с експеримента, моля, пробвайте да запишете и изслушате своя глас, за да се уверите, че всичко работи, както трябва.")
    .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()
    ,

  newMediaRecorder("test0_recording_"+id+"_"+type_of_experiment, "audio")
          .center()
          .print()
          .log()
          
    ,
 
      newButton("continue_to_questionaire", "Продължете нататък")
       .color("red")
       .center()
       .print()
        .wait()
        .log()
    
 
   
  ).setOption("hideProgressBar",true)

,

    
newTrial("demo",


    newHtml("demographics", "ru_wh_demo.html")
    .css("padding-top","10%")
    .css("line-height","1.4")
    .checkboxWarning("Моля, изберете една от възможностите.")
    .inputWarning("Моля, попълнете това поле.")
    .radioWarning("Моля, изберете една от възможностите.")
        .settings.log()
        .log("uniqueID", id)
        .print()
            
            

    ,
     newButton("continue_to_examples", "Продължете нататък")
       .color("red")
       .center()
       .print()
       .wait(
           getHtml("demographics").test.complete()
              .failure( getHtml("demographics").warn() )
           )
        .log()
       ).setOption("hideProgressBar",true)
    ,
    
  

         
        

newTrial ("trials",
    


    newText("Ще започнем с две примерни изречения, за да добиете представа за задачата. След тях започва настоящият експеримент.")
    .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()
    ,

    
  newButton("continue_to_example_1", "Продължете с пример 1")
          .color("red")
          .print()
          .center()
          .wait()
          .log()
          
          ).setOption("hideProgressBar",true)
,

    /*
    
newTrial("preload_demo_label",
      newText("Материалите за демонтрацията се зареждат. Моля изчакайте.")
        .css("width","40em")
        .css("line-height","1.4")
        //.css("padding-top","40px")
        .css("padding-bottom","20px")
        .print()
    ,
    newTimer("wait", 5000)
    .start()
    .wait()
           ).setOption("hideProgressBar",true)
 ,

  
CheckPreloaded( startsWith("demo1","demo2"))
    .label("preload_demo" );

   */



newTrial ("demo1",

 newText("Пример 1:")
    .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()
    
    ,
    newButton("listen_to_example_1", "Изслушайте изречението")
    .css("line-height","1.4")
    .center()
    .print()
    .wait()
    .log()
    ,




    newAudio("test1_audio", "Training/mono/training_STE-001_mono.wav")
         .play()
         .wait()
    ,
    
    newTimer("wait", 500)
    .start()
    .wait()
    ,

    newText("")
    .print()
    ,
    
    newText("<p style=\"font-size:18pt\">кон</p>")
    .css("line-height","1.4")
    .css("padding-top","5%")
    .center()
    .print()
    ,
    

    

//  newText("instructions", "Моля, повторете и довършете изречението, като поставите думата по-горе в подходящата форма и запишете отговора си:")
//          .print()
//          .center()
//          .css("padding-bottom","20px")
//          .css("padding-top","20px")


  newText("instructions", "Моля, довършете изречението, като поставите думата по-горе в подходящата форма и запишете отговора си:")
          .print()
          .center()
          .css("padding-bottom","20px")
          .css("padding-top","20px")


//    newAudio("myAudio", "http://myserver/audio.mp3")
      ,

     newText("")
      //.css("line-height","1.4")
      //.css("padding-top","5%")
      .print()
      ,
  
      newMediaRecorder("test1_recording_"+id+"_"+type_of_experiment, "audio")
          //.print()
          .log()
          .center()
          .once()
         
          
         ,
      
    newButton("Запис")
        .print()
        .wait()
        .remove()
        
    ,

    getMediaRecorder("test1_recording_"+id+"_"+type_of_experiment)
        .record()
        
    ,

    newButton("Стоп")
        .print()
        .wait()
        .remove()
        
    ,

    getMediaRecorder("test1_recording_"+id+"_"+type_of_experiment)
        .stop()
        
    ,
      
     newText("")
      //.css("line-height","1.4")
      //.css("padding-top","5%")
      .print()
     
      ,
      
     newText("")
      //.css("line-height","1.4")
      //.css("padding-top","5%")
      .print()
      ,
      
      newButton("continue_to_example_2", "Продължете с пример 2")
          .color("red")
          .print()
          .center()
          .wait()
          .log()
).setOption("hideProgressBar",true)
,

newTrial("demo2",

 newText("Пример 2:")
     .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()
    ,
    
    newButton("listen_to_example_2", "Изслушайте изречението")
    .css("line-height","1.4")
    .center()
    .print()
    .wait()
    .log()
    ,


    newAudio("test2_audio", "Training/mono/training_STE-002_mono.wav")
         .play()
         .wait()
    ,
    newTimer("wait", 500)
    .start()
    .wait()
    ,


    newText("")
    .print()
    ,
    

    newText("<p style=\"font-size:18pt\">крава</p>")
    .css("line-height","1.4")
    .center()
    .css("padding-top","5%")
    .print()
    ,


//  newText("instructions", "Моля, повторете и довършете изречението, като поставите думата по-горе в подходящата форма, и запишете отговора си:")
//          .print()
//          .center()
//          .css("padding-bottom","20px")
//          .css("padding-top","20px")


  newText("instructions", "Моля, довършете изречението, като поставите думата по-горе в подходящата форма, и запишете отговора си:")
          .print()
          .center()
          .css("padding-bottom","20px")
          .css("padding-top","20px")

//    newAudio("myAudio", "http://myserver/audio.mp3")
      ,

     newText("")
      //.css("line-height","1.4")
      //.css("padding-top","5%")
      .print()
      ,
  
      newMediaRecorder("test2_recording_"+id+"_"+type_of_experiment, "audio")
          //.print()
          .log()
          .center()
          .once()
      ,
      
     newButton("Запис")
        .print()
        .wait()
        .remove()
        
    ,

    getMediaRecorder("test2_recording_"+id+"_"+type_of_experiment)
        .record()
        
    ,

    newButton("Стоп")
        .print()
        .wait()
        .remove()
        
    ,

    getMediaRecorder("test2_recording_"+id+"_"+type_of_experiment)
        .stop()
        
    ,
      
     newText("")
      //.css("line-height","1.4")
      //.css("padding-top","5%")
      .print()
      ,
      

      newButton("continue_to_experiment", "Продължете с експеримента")
          .color("red")
          .print()
          .center()
          .wait()
          .log()

).setOption("hideProgressBar",true)

,
/*
newTrial("preload_trials_label",
       newText("Материалите за демонтрацията се зареждат. Моля изчакайте.")
       .css("width","40em")
       .css("padding-top","10%")
       .css("line-height","1.4")
       .print()
           ).setOption("hideProgressBar",true)

    ,
    newTimer("wait", 5000)
    .start()
    .wait()
           ).setOption("hideProgressBar",true)
 ,

  
CheckPreloaded( startsWith("experiment"))
    .label("preload_trials" );    

*/

newTrial ("expbegin",
    
      newText("Сега сме готови да започнем с основния експеримент.")
    .css("width","40em")
    .css("line-height","1.4")
    //.css("padding-top","40px")
    .css("padding-bottom","20px")
    .print()
    ,

      newButton("begin_experiment", "Започнете експеримента")
          .color("red")
          .print()
          .center()
          .wait()
          .log()
).setOption("hideProgressBar",true)
,

Template(stimuli_csv_table,
//Template("design_final.csv",
//Template("test_csv",
      variable => newTrial("experiment",

    fullscreen()
        ,
    
    newTimer(500)
        .start()
        .wait()
    ,


    newButton("listen_to_sentence", "Изслушайте изречението")
    .css("line-height","1.4")
    .center()
    .print()
    .wait()
    .log()
    ,


    newAudio("target", variable.Path_of_audio_files_final_name)
         .play()
         .wait()
    ,
    newTimer("wait", 500)
    .start()
    .wait()
    ,


    newText("")
    .print()
    ,
    
    newText("<p style=\"font-size:18pt\">"+variable.Target_noun_base_form+"</p>")
    .css("line-height","1.4")
    .css("padding-top","5%")
    .center()
    .print()
    ,

    


  newText("instructions", "Моля, довършете изречението, като поставите думата по-горе в подходящата форма и запишете отговора си:")
          .print()
          .center()
          .css("padding-bottom","20px")
          .css("padding-top","20px")

//    newAudio("myAudio", "http://myserver/audio.mp3")
      ,

     newText("")
      //.css("line-height","1.4")
      //.css("padding-top","5%")
      .print()
      ,
  

          
        newMediaRecorder(variable.Output_audio_file_partial_filename+"_"+id+"_"+type_of_experiment, "audio")
          //.print()
          .log()
          .center()
          .once()
      ,
      
     newButton("Запис")
        .print()
        .wait()
        .remove()
        
    ,

    getMediaRecorder(variable.Output_audio_file_partial_filename+"_"+id+"_"+type_of_experiment)
        .record()
        
    ,

    newButton("Стоп")
        .print()
        .wait()
        .remove()
        
    ,

    getMediaRecorder(variable.Output_audio_file_partial_filename+"_"+id+"_"+type_of_experiment)
        .stop()
        
      ,
      
     newText("")
      //.css("line-height","1.4")
      //.css("padding-top","5%")
      .print()
      ,
      
      newButton("continue_with_next_sentence", "Продължете със следващия пример")
          .color("red")
          .print()
          .center()
          .wait()
          .log()
  
  
  ).setOption("hideProgressBar",false)
.log("Type",variable.Type)
.log("Condition label",variable.Condition_label)
.log("Intervening noun base form",variable.Intervening_noun_base_form)
.log("Intervening noun plural form",variable.Intervening_noun_plural_form)
.log("Intervening noun count form",variable.Intervening_noun_count_form)
.log("Gender of intervening noun",variable.Gender_of_intervening_noun)
.log("Number of intervening noun",variable.Number_of_intervening_noun)
.log("Gender of target noun",variable.Gender_of_target_noun)
.log("Number of target noun",variable.Number_of_target_noun)
.log("Beginning",variable.Beginning)
.log("Numeral",variable.Numeral)
.log("Condition beginning",variable.Condition_beginning)
.log("First adjective",variable.First_adjective)
.log("Marker for indefinite form usage of intervening noun",variable.Marker_for_indefinite_form_usage_of_intervening_noun)
.log("First position",variable.First_position)
.log("Condition end",variable.Condition_end)
.log("Second position",variable.Second_position)
.log("Target noun base form",variable.Target_noun_base_form)
.log("Target noun plural form",variable.Target_noun_plural_form)
.log("Target noun count form",variable.Target_noun_count_form)
.log("Target noun other plural forms",variable.Target_noun_other_plural_forms)
.log("Group",variable.Group)
.log("Numeral Type",variable.Numeral_Type)
.log("Final sentence",variable.Final_sentence)
.log("Target noun after final sentence",variable.Target_noun_after_final_sentence)
.log("All audio files original name",variable.All_audio_files_original_name)
.log("Output audio file partial filename",variable.Output_audio_file_partial_filename)
.log("Number of words in condition",variable.Number_of_words_in_condition)
.log("Unique id",id)
.log("Type of experiment",type_of_experiment)



  )
,
  
newTrial( "bye" ,
   exitFullscreen()
   ,
   newText("Това е краят на екперимента. Благодарим Ви за участието! Ако имате въпроси относно експеримента, може да се обърнете по електронна поща към професор Артур Степанов 'arthur.stepanov@ung.si', професор Пенка Статева 'penka.stateva@ung.si' или Данил Христов 'danil.khristov@ung.si'.")
       .css("width","40em")
       .css("padding-top","10%")
       .css("line-height","1.4")
       .print()

  //  ,  
  // newButton()
      .wait()  // Wait for a click on a non-displayed button = wait here forever
          ).setOption("hideProgressBar",true)


DebugOff();
//.setOption("showProgressBar ",false)
//.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial