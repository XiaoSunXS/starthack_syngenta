/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

// curl -X 'GET' \
//   'https://services.cehub.syngenta-ais.com/api/DiseaseRisk/Metadata' \
//   -H 'accept: */*' \
//   -H 'ApiKey: d4f087c7-7efc-41b4-9292-0f22b6199215'

// [
// {"ModelName":"Anthracnose Foliar Blight","ModelID":"AnthracnoseFoliarBlight","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Antracnose Foliar Blight","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Irrigated Brown Patch Risk","ModelID":"BrownPatchRiskIrrigated","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Irrigated Brown Patch Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Non-Irrigated Brown Patch Risk","ModelID":"BrownPatchRiskNonIrrigated","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Non-Irrigated Brown Patch Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Crab grass Germination Risk","ModelID":"CrabgrassGerminationRisk","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Crab grass Germination Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Poa Annua Germination Risk","ModelID":"PoaAnnuaGerminationRisk","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Poa Annua Germination Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Irrigated Dollar Spot Risk","ModelID":"DollarSpotRiskIrrigated","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Irrigated Dollar Spot Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Non-Irrigated Dollar Spot Risk","ModelID":"DollarSpotRiskNonIrrigated","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Non-Irrigated Dollar Spot Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Fusarium Patch High Risk","ModelID":"FusariumPatchHighRisk","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Fusarium Patch High Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Fusarium Patch Risk","ModelID":"FusariumPatchRisk","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Fusarium Patch Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Gray Leaf Spot","ModelID":"GrayLeafSpot","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Gray Leaf Spot","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Pythium Root Rot","ModelID":"PythiumRootRotRisk","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Pythium Root Rot","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Irrigated Pythium Blight Risk","ModelID":"PythiumBlightRiskIrrigated","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Irrigated Pythium Blight Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Non-Irrigated Pythium Blight Risk","ModelID":"PythiumBlightRiskNonIrrigated","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Non-Irrigated Pythium Bligh tRisk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Rusk Risk","ModelID":"RustRisk","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Rust Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Irrigated Take All Patch Risk","ModelID":"TakeAllPatchRiskIrrigated","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Irrigated Take All Patch Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Non-Irrigated Take All Patch Risk","ModelID":"TakeAllPatchRiskNonIrrigated","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Non-Irrigated Take All Patch Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Smith-Kerns Dollar Spot","ModelID":"DollarSpotSmithModelRisk","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Smith-Kerns Dollar Spot","PropertyType":"Output","PropertyName":"RiskIndicator (pct)","PropertyDescription":"Indicator for the expected disease risk classified in percent"},
// {"ModelName":"Grass Growing potential Index","ModelID":"GrassGrowingPotentialIndex","ModelDomain":"Turf","Description":"Grass potential Indicator","PropertyType":"Output","PropertyName":"GrowthPotential (class)","PropertyDescription":"Indicator for the expected Grass Growth Potential. 0 > no growth, 1 > growth"},
// {"ModelName":"Convential Smith  Model","ModelID":"ConventionalSmithBlight","ModelDomain":"Potato","Description":"Potato disease Type predication on Forecast for Convential Smith  Model","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 3 numerical values. 0 > No Smith Period,1 > Near Miss, 2 > Full Smith Period"},
// {"ModelName":"Hutton Model","ModelID":"HuttonBlight","ModelDomain":"Potato","Description":"Potato disease Type predication on Forecast for Hutton  Model","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 3 numerical values. 0 > No Blight Period,1 > Near Miss, 2 >Full Blight Period"},
// {"ModelName":"Bruchidcast Model","ModelID":"Bruchid","ModelDomain":"Potato","Description":"Potato disease Type predication on Forecast for Bruchidcast  Model","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 2 numerical values. 0 > No Risk ( Not recommend for spraying X),1 > Risk (recommend for spraying Y)"},
// {"ModelName":"Corn - Northern corn leaf blight for US","ModelID":"CornNortherncornleafblight_US","ModelDomain":"Corn","Description":"Corn disease Type predication on both Histroical and Forecast for Corn Northern corn leaf blight for US","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-1 0 = no risk,1 = risk"},
// {"ModelName":"Wheat Septoria Leaf Blotch Risk","ModelID":"WheatSeptoriaLeafBlotchRisk","ModelDomain":"Cereal","Description":"Ceral disease Type predication on both Histroical and Forecast for Septoria Leaf Blotch disease","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 4 numerical values. 0 > no risk,1 > Low, 2 > Medium, 3 > High"},
// {"ModelName":"Poa Annua Seedheads Risk","ModelID":"PoaAnnuaSeedheadsRisk","ModelDomain":"Turf","Description":"Greencast disease Type predication on both Histroical and Forecast for Poa Annua Seedheads Risk","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
//  {"ModelName":"Potato – Early Blight (Alternaria solani) – Theory","ModelID":"PotatoEarlyBlightAlternariasolani","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both Histroical and Forecast for Alternariasolani","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// 
// {"ModelName":"Potato – Botrytis (Grey mould) – Theory","ModelID":"PotatoBotrytiscinerea","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both Histroical and Forecast for Botrytiscinerea","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Potato – Silver scurf – Theory","ModelID":"PotatoSilverscurfHelminthosporiumsolani","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both Histroical and Forecast for Helminthosporiumsolani","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Potato – Late Blight (Phytophthora infestans) – Theory","ModelID":"PotatoLateBlightPhytophthorainfestans","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both Histroical and Forecast for Phytophthorainfestans","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Potato – Sclerotinia wilt (verwelking) – Theory","ModelID":"PotatoSclerotiniawiltSclerotiniarolfsii","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both Histroical and Forecast for Sclerotiniarolfsii","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Potato – Sclerotinia rot (vrot) – Theory","ModelID":"PotatoSclerotiniarotSclerotiniasclerotiorum","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both Histroical and Forecast for Sclerotiniasclerotiorum","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Potato – Verticillium Wilt – Theory","ModelID":"PotatoVerticilliumWiltVerticilliumdahliae","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both Histroical and Forecast for Verticilliumdahliae","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Grapes – Anthracnose black spot – Theory","ModelID":"GrapesAnthracnoseblackspot","ModelDomain":"Grapes","Description":"Grapes disease Type predication on both Histroical and Forecast for Anthracnose","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Grapes – Botrytis (Grey mould) – Theory","ModelID":"GrapesBotrytiscinerea","ModelDomain":"Grapes","Description":"Grapes disease Type predication on both Histroical and Forecast for Botrytiscineria","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Grapes – Downy Mildew – Theory","ModelID":"GrapesDownyMildewPlasmoparaviticola","ModelDomain":"Grapes","Description":"Grapes disease Type predication on both Histroical and Forecast for Plasmoparaviticola","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Grapes -Powdery Mildew - Theory","ModelID":"GrapesPowderyMildewUncinulanecator","ModelDomain":"Grapes","Description":"Grapes disease Type predication on both Histroical and Forecast for Uncinulanecator","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Apple – Blossom Fire Blight – Theory","ModelID":"AppleBlossomFireBlightErwiniaamylovora","ModelDomain":"Apples","Description":"Apples disease Type predication on both Histroical and Forecast for Erwiniaamylovora","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Apple – Scab / Fusicladium – Theory","ModelID":"AppleScabFusicladiumVenturiainaequalis","ModelDomain":"Apples","Description":"Apples disease Type predication on both Histroical and Forecast for Erwiniaamylovora","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal -Powdery Mildew (Witroes) - Theory","ModelID":"CerealPowderyMildewEryspihegraminis","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Eryspihegraminis","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Canola – Blackleg (Swartstam) – Theory","ModelID":"CanolaBlacklegLeptosphaeriamaculans","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Leptosphaeriamaculans","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Canola – White leaf spot(witblaavlek/Grysstam) – Theory","ModelID":"CanolaWhiteLeafSpotPseudocercosporellacapsellae","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Pseudocercosporellacapsellae","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal – Leaf/Brown Rust (Bruin- of blaarroes) – Theory","ModelID":"CerealLeafBrownRustPucciniarecondita","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Pucciniarecondita","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal – Yellow/Stripe Rust (Geel- of stamroes) – Theory","ModelID":"CerealYellowStripeRustPucciniastriiformis","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Pucciniastriiformis","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Oats – Crow Rust (Kroon Roes) – Theory","ModelID":"OatsCrownRustPucciniaCoronata","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Pucinniacoronata","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Wheat – Black/stem Rust(stamroes) – Theory","ModelID":"WheatBlackStemRustPucciniagraminis","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Pucinniagraminis","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Barley – Net Blotch(Netviek) (pyrenophora teres) – Theory","ModelID":"BarleyNetBlotchPyrenophoraTeres","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Pyrenophorateres","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Canola – Sclerotinia Stem Rot- infection – Theory","ModelID":"CanolaSclerotiniaInfection","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Sclerotiniasclerotioruminfection","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal – Septoria Tritici Leaf Blotch/Spot (Blaarvlek/Vaalblaar) – Theory","ModelID":"CerealSeptoriaTriticiLeafBlotchSpot","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for SeptoriaTritici","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Ceral – Septoria Leaf/Glume Blotch(Bruinaarsiekte) – Theory","ModelID":"CerealSeptoriaLeafGlumeBlotchStagonosporaNodorum","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Stagonosporanodorum","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Wheat – karnal/partial Bunt(Karnal/Gedeeltelike Brand) – Theory","ModelID":"WheatKarnalPartialBuntTilletiaindicavar","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Tilletiaindica","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Wheat – Fusarium Head Blight – Theory","ModelID":"WheatFusariumHeadBlight","ModelDomain":"Cereal","Description":"Ceral disease Type predication on both Histroical and Forecast for WheatFusariumHeadBlight","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Corn – Fusarium Head Blight – Theory","ModelID":"CornFusariumHeadBlight","ModelDomain":"Corn","Description":"Corn disease Type predication on both Histroical and Forecast for CornFusariumHeadBlight","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Corn – Gray Leaf Spot – Theory","ModelID":"CornGrayLeafSpot","ModelDomain":"Corn","Description":"Corn disease Type predication on both Histroical and Forecast for CornGrayLeafSpot","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Corn – Northern corn leaf blight (NCLB) - Theory","ModelID":"CornNortherncornleafblightNCLB","ModelDomain":"Corn","Description":"Corn disease Type predication on both Histroical and Forecast for CornNortherncornleafblightNCLB","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Corn - Southern corn leaf blight (SCLB) – Theory","ModelID":"CornSoutherncornleafblightSCLB","ModelDomain":"Corn","Description":"Corn disease Type predication on both Histroical and Forecast for CornSoutherncornleafblightSCLB","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Canola – Sclerotinia Stem Rot – Apothecia on sclerotiums – Theory","ModelID":"CanolaSclerotiniaApothecia","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Sclerotiniasclerotioruminfection","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Planting window -Corn","ModelID":"Corn","ModelDomain":"Corn","Description":"Planting windows recommendation for Corn","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 = slight recommend, 2 = recommend"},
// {"ModelName":"Planting window -Corn(Russia)","ModelID":"PW_Corn_RU","ModelDomain":"Corn(Russia)","Description":"Planting windows recommendation for Corn for Russia","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 = recommend"},
// {"ModelName":"Planting window -Spring Barely","ModelID":"PW_Spring_Barely","ModelDomain":"Spring Barely","Description":"Planting windows recommendation for Spring Barely","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 = recommend"},
// {"ModelName":"Planting window - Spring Wheat","ModelID":"PW_Spring_Wheat","ModelDomain":"Spring Wheat","Description":"Planting windows recommendation for Spring Wheat","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 =  recommend"},
// {"ModelName":"Planting window -Winter Wheat","ModelID":"PW_Winter_Wheat","ModelDomain":"Winter Wheat","Description":"Planting windows recommendation for Winter Wheat","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 = recommend"},
// {"ModelName":"Planting window -Sunflower","ModelID":"PW_Sunflower","ModelDomain":"Sunflower","Description":"Planting windows recommendation for Sunflower","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 = recommend"},
// {"ModelName":"Planting window - OSR","ModelID":"PW_OSR","ModelDomain":"OSR","Description":"Planting windows recommendation for OSR","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 = recommend"},
// {"ModelName":"Planting window - Soybean","ModelID":"PW_Soybean","ModelDomain":"Soybean","Description":"Planting windows recommendation for Soybean","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 = recommend"},
// {"ModelName":"Planting window - Canola","ModelID":"PW_Canola","ModelDomain":"Canola","Description":"Planting windows recommendation for Canola","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 = recommend"},
// {"ModelName":"Planting window - Sugarbeet","ModelID":"PW_SugarBeet","ModelDomain":"SugarBeet","Description":"Planting windows recommendation for SugarBeet","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 = recommend"},
// {"ModelName":"Drone Recommendation - M300","ModelID":"M300","ModelDomain":"Drone","Description":"Drone recommendation","PropertyType":"Output","PropertyName":"Drone Recommendation(class)","PropertyDescription":"Recommendation for Drone Flight  0 = not recommend,1 = recommend"},
// {"ModelName":"Drone Recommendation - Phantom","ModelID":"Phantom","ModelDomain":"Drone","Description":"Drone recommendation days","PropertyType":"Output","PropertyName":"Drone Recommendation(class)","PropertyDescription":"Recommendation for Drone Flight  0 = not recommend,1 = recommend"},
// {"ModelName":"Planting window - Tomato","ModelID":"PW_Tomato","ModelDomain":"Tomato","Description":"Planting windows recommendation for Tomato","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1 = recommend"},
// {"ModelName":"Pepper - HotPepperBemisiatebasi","ModelID":"HotPepperBemisiatebasi","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for Bemisiatebasi","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Corn - Gray Leaf Spot for US","ModelID":"CornGrayLeafSpot_US","ModelDomain":"Corn","Description":"Corn disease Type predication on both Histroical and Forecast for Corn Gray Leaf Spot for US","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-1 0 = no risk,1 = risk"},
// {"ModelName":"Pepper - HotPepperThripstebasi","ModelID":"HotPepperThripstebasi","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperThripstebasi","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Pepper - HotPepperAculopslycopersici","ModelID":"HotPepperAculopslycopersici","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperAculopslycopersici","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Pepper - HotPepperHelicoverpaarmigeraSpodopteralitura","ModelID":"HotPepperHelicoverpaarmigeraSpodopteralitura","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperHelicoverpaarmigeraSpodopteralitura","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Heat stress","ModelID":"HeatStress","ModelDomain":"Potato","Description":"Heat stress","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected stress risk classified in the range of 0-1 0 = no risk,1 = risk"},
// {"ModelName":"Pepper - HotPepperAnthracnose","ModelID":"HotPepperAnthracnose","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperAnthracnose","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Pepper - HotPepperLeveillulataurica","ModelID":"HotPepperLeveillulataurica","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperLeveillulataurica","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Pepper - HotPepperAtheliaRolfsii","ModelID":"HotPepperAtheliaRolfsii","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperAtheliaRolfsii","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Pepper - HotPepperColletotrichumcapsici","ModelID":"HotPepperColletotrichumcapsici","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperColletotrichumcapsici","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Pepper - HotPepperChilLeaf","ModelID":"HotPepperChilLeaf","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperChilLeaf","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Pepper - HotPepperPhytophoracapsici","ModelID":"HotPepperPhytophoracapsici","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperPhytophoracapsici","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Pepper - HotPepperFusariumoxysporum","ModelID":"HotPepperFusariumoxysporum","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperFusariumoxysporum","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal – Leaf/Brown Rust (Bruin- of Pucciniarecondita) – Theory for Russia","ModelID":"CerealLeafBrownRustPucciniarecondita_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for LeafBrownRustPucciniarecondita for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal – Leaf/Brown Rust (Bruin- of Pucciniahordei) – Theory for Russia","ModelID":"CerealLeafBrownRustPucciniahordei_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for CerealLeafBrownRustPucciniahordei for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal – Powdery Mildew (Witroes) – Theory for Russia","ModelID":"CerealPowderyMildewEryspihegraminis_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for CerealPowderyMildewEryspihegraminis for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal – Yellow/Stripe Rust (Geel- of stamroes) – Theory for Russia","ModelID":"CerealYellowStripeRustPucciniastriiformis_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for YellowStripeRustPucciniastriiformis for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal – Eyespot (Oogvlek) – Theory for Russia","ModelID":"CeralPseudocercosporellaherpotrichoides_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for CeralPseudocercosporellaherpotrichoides for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Barley – Net Blotch (Netvlek) (Pyrenophora teres) – Theory for Russia","ModelID":"BarleyNetBlotchPyrenophoraTeres_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for BarleyNetBlotchPyrenophoraTeres for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal – Septoria Tritici Leaf Blotch/Spot (Blaarvlek/Vaalblaar) – Theory for Russia","ModelID":"WheatSeptoriaLeafBlotchRisk_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for WheatSeptoriaLeafBlotchRisk for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Wheat – Fusarium Head Blight – Theory for Russia","ModelID":"WheatFusariumHeadBlight_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for WheatFusariumHeadBlight for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Early Blightcast Disease Risk ","ModelID":"EarlyBlight","ModelDomain":"Potato","Description":"Potato disease Type predication on Forecast for Early Blightcast  Model","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 3 numerical values. 0 > No Risk,1 > Medium Risk, 2 > High Risk"},
// {"ModelName":"Wheat – Black/Stem Rust (Stamroes) – Theory for Russia","ModelID":"WheatBlackStemRustPucciniagraminis_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for WheatBlackStemRustPucciniagraminis for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Oats – Crown Rust (Kroon Roes) – Theory for Russia","ModelID":"OatsCrownRustPucciniaCoronata_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for OatsCrownRustPucciniaCoronata for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Canola – Blackleg (Swartstam) – Theory for Russia","ModelID":"CanolaBlacklegLeptosphaeriamaculans_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for CanolaBlacklegLeptosphaeriamaculans for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Frost Alert","ModelID":"FrostAlert","ModelDomain":"Potato","Description":"Frost stress","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected stress risk classified in the range of 0-1 0 = no risk,1 = risk"},
// {"ModelName":"Canola – Sclerotinia Stem Rot – Infection – Theory for Russia","ModelID":"CanolaSclerotiniaInfection_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for CanolaSclerotiniaInfection for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Corn – Northern corn leaf blight (NCLB) - Theory","ModelID":"CornNortherncornleafblightNCLB_RU","ModelDomain":"Corn","Description":"Corn disease Type predication on both historical and Frecast for CornNortherncornleafblightNCLB","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Wheat – Pyrenophra Tritici Repentis – Theory for Russia","ModelID":"WheatPyrenophraTriticiRepentis_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for PyrenophraTriticiRepentis for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Potato – PotatoPhytophotraInfestans","ModelID":"PotatoPhytophotraInfestans","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both historical and Frecast for PhytophotraInfestans for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Potato – Alternariasolani","ModelID":"PotatoAlternariasolani","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both historical and Frecast for Alternariasolani for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Pepper - HotPepperAphisgossypii","ModelID":"HotPepperAphisgossypii","ModelDomain":"Pepper","Description":"Pepper disease Type predication on both historical and Frecast for HotPepperAphisgossypii","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal – Septoria Leaf/Glume Blotch (Bruinaarsiekte) – Theory for Russia","ModelID":"CerealSeptoriaLeafGlumeBlotchStagonosporaNodorum_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for CerealSeptoriaLeafGlumeBlotchStagonosporaNodorum for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Planting window -Sunflower for France","ModelID":"PW_Sunflower_FR","ModelDomain":"Sunflower","Description":"Planting windows recommendation for Sunflower for France","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1=recommend,2 = highly recommend"},
// {"ModelName":"Planting window -Corn for France","ModelID":"PW_Corn_FR","ModelDomain":"Corn","Description":"Planting windows recommendation for Corn for France","PropertyType":"Output","PropertyName":"Planting Recommendation(class)","PropertyDescription":"Recommendation for planting seeds  0 = not recommend,1=recommend,2 = highly recommend"},
// {"ModelName":"Sunflower – RustUrediniospore","ModelID":"SunflowerRustUrediniospore","ModelDomain":"Sunflower","Description":"Corn disease Type predication on both historical and Frecast for SunflowerRustUrediniospore","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Sunflower – RustAeciospore","ModelID":"SunflowerRustAeciospore","ModelDomain":"Sunflower","Description":"Corn disease Type predication on both historical and Frecast for SunflowerRustUrediniospore","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Potato – Early Blight (Alternaria solani) – Theory for Poland","ModelID":"PotatoEarlyBlightAlternariasolani_PL","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both Histroical and Forecast for Alternariasolani in Poland","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cereal -Powdery Mildew (Witroes) - Theory for Poland","ModelID":"CerealPowderyMildewEryspihegraminis_PL","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Eryspihegraminis in Poland","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Canola – Sclerotinia Stem Rot – Apothecia on sclerotiums – Theory for Russia","ModelID":"CanolaSclerotiniaApothecia_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for CanolaSclerotiniaApothecia for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cold Alert for India","ModelID":"ColdStress_IN","ModelDomain":"Forecast","Description":"Forecast Alert for cold wave","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected stress risk classified in the range of 0-2 0 = no risk,1 = cold wave,2 = Severe cold wave"},
// {"ModelName":"Heat Alert for India","ModelID":"HeatStress_IN","ModelDomain":"Forecast","Description":"Forecast Alert for Heat wave","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected stress risk classified in the range of 0-2 0 = no risk,1 = Heat wave,2 = Severe Heat wave"},
// {"ModelName":"Precipitation Alert for India","ModelID":"Precipitation_IN","ModelDomain":"Forecast","Description":"Forecast Alert for Precipitation","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected stress risk classified in the range of 0-3 0 = no risk,1 = Heavy Rain, 2 = Very Heavy Rain, 3 = Extremely Heavy Rain"},
// {"ModelName":"Potato – PotatoPhytophotraInfestans for Russia","ModelID":"Potato – PotatoPhytophotraInfestans_RU","ModelDomain":"Potato_V2","Description":"Potato disease Type predication on both historical and Frecast for PhytophotraInfestans for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Cyclones Alert for India","ModelID":"Cyclone_IN","ModelDomain":"Forecast","Description":"Forecast Alert for Cyclone","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected stress risk classified in the range of 0-4 0 = no risk,1 = Cyclonic storm, 2 = Severe cyclonic storm, 3 = Very severe cyclonic storm, 4 =Super cyclone"},
// {"ModelName":"Corn - TarSpot","ModelID":"TarSpot","ModelDomain":"Corn","Description":"Corn disease Type predication on Forecast for TarSpot","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 5 numerical values. 0 > no risk,1 > Very low, 2 > Low, 3 > Medium, 4 > High"},
// {"ModelName":"Corn - TarSpot for US","ModelID":"TarSpot_US","ModelDomain":"Corn","Description":"Corn disease Type predication on both historical and forecast for TarSpot","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for risk prediction in probablity 0-00 -> no risk, 0.99 -> high risk"}]%


// Wheat models: 
// {"ModelName":"Wheat Septoria Leaf Blotch Risk","ModelID":"WheatSeptoriaLeafBlotchRisk","ModelDomain":"Cereal","Description":"Ceral disease Type predication on both Histroical and Forecast for Septoria Leaf Blotch disease","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in 4 numerical values. 0 > no risk,1 > Low, 2 > Medium, 3 > High"},
// {"ModelName":"Wheat – Black/stem Rust(stamroes) – Theory","ModelID":"WheatBlackStemRustPucciniagraminis","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Pucinniagraminis","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Wheat – karnal/partial Bunt(Karnal/Gedeeltelike Brand) – Theory","ModelID":"WheatKarnalPartialBuntTilletiaindicavar","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both Histroical and Forecast for Tilletiaindica","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Wheat – Fusarium Head Blight – Theory","ModelID":"WheatFusariumHeadBlight","ModelDomain":"Cereal","Description":"Ceral disease Type predication on both Histroical and Forecast for WheatFusariumHeadBlight","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Wheat – Fusarium Head Blight – Theory for Russia","ModelID":"WheatFusariumHeadBlight_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for WheatFusariumHeadBlight for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Wheat – Black/Stem Rust (Stamroes) – Theory for Russia","ModelID":"WheatBlackStemRustPucciniagraminis_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for WheatBlackStemRustPucciniagraminis for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},
// {"ModelName":"Wheat – Pyrenophra Tritici Repentis – Theory for Russia","ModelID":"WheatPyrenophraTriticiRepentis_RU","ModelDomain":"Cereal","Description":"Cereal disease Type predication on both historical and Frecast for PyrenophraTriticiRepentis for Russia","PropertyType":"Output","PropertyName":"RiskIndicator (class)","PropertyDescription":"Indicator for the expected disease risk classified in the range of 0-10. 0 = no risk,10 = High"},

// In India: 
// Wheat Disease Models:

// "WheatKarnalPartialBuntTilletiaindicavar" (Karnal Bunt) - This is especially important for Indian farmers since Karnal Bunt is named after Karnal, India, where it was first identified. It remains a significant wheat disease in India.
// "WheatBlackStemRustPucciniagraminis" - Wheat stem rust is a serious concern for wheat farmers in India, particularly in northern wheat-growing regions.


export async function GET(request: NextRequest) {
  console.log('Inside GET of disease.ts');
  try {
    const searchParams = request.nextUrl.searchParams;
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    // Default to CornRisk if not specified
    const modelId = searchParams.get('modelId') || 'WheatKarnalPartialBuntTilletiaindicavar';

    console.log({
      latitude,
      longitude,
      startDate,
      endDate,
      modelId
    });

    if (!latitude || !longitude || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const DISEASE_API_KEY = process.env.NEXT_PUBLIC_CEHUB_FORECAST_API_KEY; // Using the same key for simplicity
    const BASE_URL = process.env.NEXT_PUBLIC_CEHUB_BASE_URL;

    // Construct URL for disease risk
    const url = `${BASE_URL}/DiseaseRisk/${modelId}?latitude=${latitude}&longitude=${longitude}&startDate=${startDate}&endDate=${endDate}&modelId=${modelId}`;
    
    console.log('Disease API Fetching from URL:', url);
    
    // Pass the API key as a header
    const response = await fetch(url, {
      headers: {
        'ApiKey': DISEASE_API_KEY || '',
        'Accept': '*/*'
      }
    });
    
    console.log('API status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Disease Risk API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data);
    
    // Process the data to match what your component expects
    const processedData = processDiseaseData(data, modelId);
    console.log('Disease API Processed data:', processedData);
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching disease risk data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch disease risk data' },
      { status: 500 }
    );
  }
}

// Process the disease data to match the expected format
function processDiseaseData(rawData: any, modelId: string) {
  if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
    return {
      cropType: getCropTypeFromModelId(modelId),
      diseases: [],
      overallRisk: 'Low'
    };
  }
  
  // Group by disease name
  const diseaseGroups = rawData.reduce((acc: any, item: any) => {
    const diseaseName = item.diseaseName || 'Unknown Disease';
    
    if (!acc[diseaseName]) {
      acc[diseaseName] = [];
    }
    
    acc[diseaseName].push({
      date: item.date?.split(' ')[0] || 'Unknown Date',
      riskLevel: getRiskLevel(item.riskNumerical || 0),
      riskValue: item.riskNumerical || 0,
      details: item.details || ''
    });
    
    return acc;
  }, {});
  
  // Convert to array format expected by the component
  const diseases = Object.keys(diseaseGroups).map(diseaseName => {
    const entries = diseaseGroups[diseaseName];
    const avgRisk = entries.reduce((sum: number, entry: any) => sum + entry.riskValue, 0) / entries.length;
    
    return {
      name: diseaseName,
      riskLevel: getRiskLevel(avgRisk),
      details: entries
    };
  });
  
  // Calculate overall risk
  const overallRisk = calculateOverallRisk(diseases);
  
  return {
    cropType: getCropTypeFromModelId(modelId),
    diseases,
    overallRisk
  };
}

// Get crop type from modelId
function getCropTypeFromModelId(modelId: string): string {
  switch (modelId) {
    case 'CornRisk':
    case 'CornRisk_V2':
      return 'Corn/Maize';
    case 'PotatoRisk':
    case 'PotatoRisk_V2':
      return 'Potato';
    case 'AppleRisk':
      return 'Apple';
    case 'GrapesRisk':
      return 'Grapes';
    case 'PepperRisk':
      return 'Pepper';
    case 'CerealRisk':
      return 'Cereal';
    case 'TurfRisk':
      return 'Turf';
    default:
      return 'Unknown Crop';
  }
}

// Calculate risk level based on numerical risk value
function getRiskLevel(riskValue: number): string {
  if (riskValue >= 7) {
    return 'High';
  } else if (riskValue >= 4) {
    return 'Medium';
  } else {
    return 'Low';
  }
}

// Calculate overall risk based on individual disease risks
function calculateOverallRisk(diseases: any[]): string {
  if (!diseases.length) return 'Low';
  
  if (diseases.some(disease => disease.riskLevel === 'High')) {
    return 'High';
  } else if (diseases.some(disease => disease.riskLevel === 'Medium')) {
    return 'Medium';
  } else {
    return 'Low';
  }
}