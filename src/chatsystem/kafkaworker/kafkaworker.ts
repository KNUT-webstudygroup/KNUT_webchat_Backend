import * as kafka from 'kafkajs'
// KAFKA를 활용하여 유저들에게 전송하거나 입력받는 Ts단 워커를 기록하는 곳.
/**
 * 1. KAFKA의 브로커는 하나의 리전서버로 보고, 
 * 2. KAFKA의 토픽을 하나의 채널로 하자.
 * 3. 그렇다면, 토픽이 담는 메세지에 채널 저ㅗㅇ보를 담는 것을 목표로 하자.
 * 4. 채널의 모음은, DB로 처리한다.  
 * */ 