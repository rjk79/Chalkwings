import React from 'react'
import Button from '../library/button'
import './training_guide.css'

class TrainingGuide extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            type: "Intro",
            color: "#8884d8"
        }
    }
    componentDidUpdate(prevProps, prevState){
        // change .guide instead
        // if (this.state.type !== prevState.type) {
        //     this.addLinkOutIcons()
        // }
    }

    stars(rating){
        let stars = []
        for (let i = 0;i<rating;i++){
            stars.push('\u2605')
        }
        for (let i = 0;i<3-rating;i++){
            stars.push('\u2606')
        }
        return <div className="stars">Difficulty: {stars.join(" ")}</div>
    }
    handleClick(field1, field2){
        return e => {
            this.setState({type: field1, color: field2})
        }
    }
    introInfo(){

        return (
            <>
            <p>Whether you're new to climbing and trying to get a fast start or experienced and trying to get to the next level, these exercises will help you elevate your skills.
            </p>

            <br/> <br/>
            <div>
                <p>
                    There are a few common characteristics of the exercises I have included:
                </p>
                <p className="intro-paragraph">
                    <i className="fas fa-child"></i>
                    <strong>Bodyweight:</strong> Being able to manipulate your body is one of the most important aspects of climbing and because this is already very challenging, added weight is usually unnecessary.
                </p>
                <p className="intro-paragraph">
                    <i className="fas fa-dumbbell"></i>
                    <strong>Free-weight:</strong> Being able to manage mobile weight focuses your core and saves time by working out multiple muscles at once. As a result of this, however, proper form is very important.
                </p>
                <p className="intro-paragraph">
                    <i className="fas fa-bullseye"></i>
                    <strong>Targeted:</strong> While climbing can challenge almost every part of your body, it is most efficient to train only certain parts in order to
                     see noticeable progress, save time + energy and prevent unnecessary mass gain.
                </p>
            </div>
            </>
        )
    }
    climbingInfo(){

        return(
            <>
                <div className="subtitle"> Foot Cuts (Core Tension):  {this.stars(1)}</div> <br/>
                Choose a boulder problem. Each time you grab a new hold, simultaneously remove both feet from the wall.Then squeeze your core and place them back on.  <br/>
                <br/>
                <div className="subtitle"> No Readjustments (Hand and Foot Placement): {this.stars(1)}</div> <br/>
                Choose a boulder problem. Each time you grab or step on a new hold, you cannot shift around on it to find a better position.  <br/>
                <br/>
                <div className="subtitle"> One Hold Type (Hand and Foot Placement): {this.stars(1)} </div> <br/>
                Choose a boulder problem and a type of hold (Sloper, Pincher, Undercling, Sidepull, Crimp).Whenever you grab a hold, you must grip it as if it was the chosen hold type.
                <br /><br />
                <div className="subtitle"> Ladder -- Endurance {this.stars(2)}</div> <br/>
                Do one climb at each V grade, starting at V0, until you reach[your max V grade].Then do work your way down the grade scale. <br/>
                <br/>
                <div className="subtitle"> Red Point (Power): {this.stars(2)}</div> <br/>
                Attempt all boulder problems at[your max V grade] in the gym.Only give each problem 3 attempts at most.
                <br/><br/>

                <div className="subtitle"> Four by Four (Power-Endurance): {this.stars(3)}</div> <br/>
                Step 1: Choose 4 boulder problems that are[your max V grade - 2].  <br/>
                Step 2: Attempt each of them once without taking breaks between problems.  <br/>
                Step 3: Rest for 4 minutes. <br/>
                Step 4: Repeat steps 2 and 3, three more times.<br/>
                <br/>

                <div className="subtitle"> Pyramid -- Endurance</div> {this.stars(3)}<br/>
                [Your max V grade minus 3]:  Do 4 climbs at this grade. <br/>
                [Your max V grade minus 2]: Do 3 climbs at this grade. <br/>
                [Your max V grade minus 1]: Do 2 climbs at this grade. <br/>
                [Your max V grade]: Do 1 climb at this grade. <br/>
                <br/>

                <br/>
            </>
        )
    }
    intermediateInfo(){
        return (
            <>
            {this.stars(1)}
            <div className="subtitle"> Week 1-3 </div>  <br/>
            - Choose 3 Non - consecutive days to do this workout(8MinuteAbs can be everyday)(takes about 1 hour) <br/>
                - take a minute of rest after every bullet point <br/ >
        •	(Optional) Lose Weight-- Jump Rope for 10 min or Traverse for 10 min <br/>
        •	Core-- < a href = "https://www.youtube.com/watch?v=sWjTnBmCHTY" > Abs <i className="fas fa-external-link-alt"></i> </a > <br/>
 <br/ >
            Repeat the following list 3 times: <br/>
        •	Vertical Pull-- Do as many<a href = "https://www.youtube.com/watch?v=QH0dDfyF7QM" > L - Sit Pull-ups <i className="fas fa-external-link-alt"></i> </a > as you can.Afterwards, do as many normal pull-ups as you can with a elastic band<br/ >
 <br/ >
        •	Horizontal Push-- Do as many<a href = "https://www.youtube.com/watch?v=2qa1avIsLaA" > X - Push-ups <i className="fas fa-external-link-alt"></i> </a > as you can.Afterwards, do as many normal push-ups as you can <br/ >
 <br/ >
        •	Fingers-- 6 < a href = "https://youtu.be/7bS-19Cl8Kk?t=120 " > Repeaters <i className="fas fa-external-link-alt"></i> </a >  <br/ >
 <br/ >
        •	Vertical Push-- Do as many<a href = "https://www.youtube.com/watch?v=IOlHTsmfr68 " > Assisted Dips <i className="fas fa-external-link-alt"></i> </a > as you can <br/ >
<br/ >
        •	Horizontal Pull-- Do as many<a href = "https://www.youtube.com/watch?v=Qj8ixEU638M" > Ring Rows <i className="fas fa-external-link-alt"></i> </a > as you can  <br/ >
<br/ >
        •	Shoulders-- 5 < a href = "https://www.youtube.com/watch?v=icD6a_JcCbQ" > Depression Scapular Pull-ups <i className="fas fa-external-link-alt"></i> </a >  <br/ >
<br/ >
        •	Shoulders-- 5 < a href = "https://youtu.be/6P9r0UAdwXM?t=69" > Retraction Scapular Pull-ups <i className="fas fa-external-link-alt"></i> </a > <br/ >
 <br/ >
            <div className="subtitle"> Week 4-6 </div>
            - Choose 3 Non - consecutive days to do this workout(takes about 1 hour) <br/ >
                - take a minute of rest after every bullet point <br/ >
        •	(Optional) Lose Weight - Jump Rope for 10 min or Traverse for 10 min <br/ >
            Repeat the following list 3 times: <br/ >
        •	Core – Do as many<a href = "https://youtu.be/riAutegDqdI?t=73" > V-ups  <i className="fas fa-external-link-alt"></i> </a > as you can <br/ >
<br/ >
        •	Core – Do as many<a href = "https://www.youtube.com/watch?v=NeAtimSCxsY" > Russian Twists  <i className="fas fa-external-link-alt"></i> </a > as you can with 10 lbs. <br/ >
<br/ >
        •	Vertical Pull - Do as many Pull-ups as you can.Afterwards, do as many normal pull-ups as you can with a elastic band <br/ >
<br/ >
        •	Horizontal Push - Do as many<a href = "https://www.youtube.com/watch?v=7enjS7Y2LYc" > Ring Push-ups  <i className="fas fa-external-link-alt"></i> </a > as you can.Afterwards, do as many normal push-ups as you can <br/ >
<br/ >
        •	Fingers - 6 < a href = "https://youtu.be/7bS-19Cl8Kk?t=120" > Repeaters  <i className="fas fa-external-link-alt"></i> </a > with 2.5 lbs held by feet. 10 or 15mm edge <br/ >
<br/ >
        •	Vertical Push – 10 sec < a href = "https://www.youtube.com/watch?v=C07M-t0_Vxg" > Ring Support Hold  <i className="fas fa-external-link-alt"></i> </a > <br/ >
<br/ >
        •	Horizontal Pull - Do as many<a href = "https://www.youtube.com/watch?v=RTPzzjQQYIU" > One Arm Ring Rows <i className="fas fa-external-link-alt"></i> </a > as you can <br/ >
<br/ >
        •	Shoulders - 5 < a href = "https://www.youtube.com/watch?v=a8n_V0oiifw" > One Arm Depression Scapular Pull-ups <i className="fas fa-external-link-alt"></i> </a >. <br/ >
<br/ >
        •	Shoulders - 5 < a href = "https://www.youtube.com/watch?v=OYRAFPM2yDI" > Tucked Lever Pulls <i className="fas fa-external-link-alt"></i> </a > <br/ >
<br/ >
            <div className="subtitle"> Week 7-9 </div>
            - Choose 3 Non - consecutive days to do this workout(takes about 1 hour)
                - take a minute of rest after every bullet point
        •	(Optional) Lose Weight - Jump Rope for 10 min or Traverse for 10 min
<br/ >
            Repeat the following list 3 times:
<br/ >
        •	Core – 15 < a href = "https://www.youtube.com/watch?v=l4kQd9eWclE" > Leg - Ups <i className="fas fa-external-link-alt"></i> </a >
<br/ >
        •	Core – 6(3 on each side) < a href = "https://www.youtube.com/watch?v=hrS3QsNqvTQ" > Lying Windshield Wipers <i className="fas fa-external-link-alt"></i> </a >
<br/ >
        •	Core – 5 < a href = "https://youtu.be/aEgyCi1J1qI?t=83" > Knee Ab Wheel Rollouts <i className="fas fa-external-link-alt"></i> </a >. Don’t count reps where you can’t come back up.
<br/ >
        •	Vertical Pull - Do as many Pull-ups as you can.Afterwards, do as many normal pull-ups as you can with a elastic band
<br/ >
        •	Horizontal Push - Do as many<a href = "https://www.youtube.com/watch?v=svLqaM6-cnQ" > Knee Flies <i className="fas fa-external-link-alt"></i> </a > as you can.Afterwards, do as many normal push-ups as you can
<br/ >
        •	Fingers – 5sec Max Hang with 5lb held by feet. 10 or 15mm edge
<br/ >
        •	Vertical Push – Do as many Dips as you can
<br/ >
        •	Horizontal Pull - Do as many<a href = "https://www.youtube.com/watch?v=OH3QZB8oDkg" > Inclined Ring Rows <i className="fas fa-external-link-alt"></i> </a > as you can
<br/ >
        •	Shoulders – 5 < a href = "https://www.youtube.com/watch?v=UZ4XlVNmGtk" > One Leg Lever Pulls <i className="fas fa-external-link-alt"></i> </a >
<br/ >
            </>
        )
    }
    fingerInfo(){
        return (
            <>
            <div className="subtitle">Hangboard {this.stars(2)}</div>
<br/ > Variation 1: Repeaters < a href = "https://www.youtube.com/watch?v=8YTn7qEpxtU" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/ >
<br/ > The de facto way to improve finger tendon strength. Choose a pair of edges that are 10 - 15mm and can hold all four fingers.Using an open - crimp position, hang off the edges for 7 seconds then rest for 3 seconds.Repeat this 5 more times for a total of 6 hangs.
<br/ >
<br/ > Variation 2:
<br/ > Do hangboard Repeaters using different pockets and edges
<br/ >
<br/ > Variation 3:
<br/ > Do hangboard Repeaters using less fingers
<br/ >
<br/ > Variation 4: Max Hangs
<br/ > Choose a pair of edges that are 10 - 15mm and can hold all four fingers.Attach weight to yourself using a harness or weight vest.
<br/ > Using an open - crimp position, hang off the edges for at least 5 seconds then rest for at least 5 mins.Repeat this 4 more times for a total of 5 hangs.
<br/ >
<br/ > Variation 5: One Arm Hangs
<br/ > Choose a pair of edges that are 10 - 15mm and can hold all four fingers.Use a pulley system to provide a counter weight so you are lighter.
<br/ > Using an open - crimp position, hang off the edges for at least 5 seconds then rest for at least 5 mins.Repeat this 4 more times for a total of 5 hangs.
<br/ >
                <br /> <div className="subtitle">Campus Board {this.stars(2)}</div>
<br/ > Variation 1:
<br/ > Using an open - crimp position, go up the campus board using every rung and match on each before going up to the next one.
<br/ >
<br/ > Variation 2:
<br/ > Variation 1 without matching rungs.
<br/ >
<br/ > Variation 3:
<br/ > Variation 1 while skipping rungs.
<br/ >
<br/ > Variation 4: Dynoing
<br/ > With both hands on the bottom rung.reach up to the highest rung you can.
<br/ >
<br/ > Variation 5:
<br/ > Do Variation 4 then reach as high as you can with you’re other hand.
<br/ >
<br/ > Variation 6: Bumping < a href = "https://www.youtube.com/watch?v=xLPdz0n5hkE" > Demo Video <i className="fas fa-external-link-alt"></i> </a >
<br/ > With both hands on the bottom rung, move one hand up to the next rung, then the next rung, etc until you cannot go further.
<br/ >
<br/ > Variation 7: Alternating < a href = "https://www.youtube.com/watch?v=RhAutTnvAgQ" > Demo Video <i className="fas fa-external-link-alt"></i> </a >
<br/ > With both hands on the bottom rung, move one hand up to a higher rung then bring it back down to the bottom rung and repeat.Adjust difficulty by adding reps and reaching higher.
<br/ >
<br/ > Variation 8: Downclimbing
<br/ > Do Variation 1 then down climb using every rung.
<br/ >
<br/ > Variation 9: Swapping
<br/ > Not advised for beginners.With hands on different rungs, simultaneously swap which rungs they’re on and repeat.
<br/ >
<br/ > Variation 10: Double clutching
<br/ > Not advised for beginners.With both hands on the bottom rung, simultaneously reach up for a higher one using both hands.<br/ >
<br/ >
            </>
        )
    }
    calisthenicsInfo(){
        return (
                <>
            Work on the first exercise of each Progression list.Once you are able to do the full amount of reps + sets in one session, try adding reps + sets until you can do the next exercise in the list. (videos to come!)

                < br/ >
                <div className="subtitle">1. Dips and Iron Cross Prog. {this.stars(3)}</div> <br/>
                Band pull - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=1xEizoLOqmA" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Assisted Dips - 5 reps * 5 sets <br/>
            Dips - 5 reps * 5 sets <br/>
                Ring hold - 5 seconds < a href = "https://www.youtube.com/watch?v=iODfBpAI2hc" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Weighted Dips - 5 reps * 5 sets <br/>
            Ring Dips - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=CONXdUoBzdI" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Half Cross - 10 seconds * 3 sets < a href = "https://www.youtube.com/watch?v=vK8LxtyKZf0" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Strap Cross - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=vH1w7DQhafc" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
            <br/>
                <div className="subtitle">2. Flies and Planche Prog. {this.stars(3)}</div> <br/>
                Push-ups - 10 reps * 3 sets <br/>
            X push-ups - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=IOQjVhXOEeo" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Push-ups(on rings) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=7enjS7Y2LYc" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Ring Flies(on knees, feet up) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=svLqaM6-cnQ" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Ring Flies(on knees, feet down) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=sMB6GrrRX2Y" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Ring Flies - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=Q1hgPfcooGc" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Pseudo Planche Pushups - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=CVUM4BKIbf8" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Raised Ring Flies - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=PNo7ZEUtOms" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
            <br/>
                <div className="subtitle">3. Dragon Flag Prog. {this.stars(3)}</div> <br/>
                Lying Leg Raises - 10 reps * 3 sets < a href = "https://www.youtube.com/watch?v=qJt-Ah-lWCw" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        V-ups - 10 reps * 3 sets <br/>
            Leg - ups - 10 reps * 3 sets < a href = "https://www.youtube.com/watch?v=g2R_Y9rE0Hg" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Toes to Bar - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=X4n7GKTQhwg" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Dragon Flag - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=gub2VJbEF-c" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
            <br/>
                <div className="subtitle">4. Superman Flies Prog. {this.stars(3)}</div> <br/>
                Plank - 90 seconds <br/>
            Crunches - 40 reps * 1 set <br/>
                Ab Wheel Rollouts - 5 reps * 5 sets <br/>
                    Knee Superman Flies - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=hZFOcyaL_ds" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Superman Flies(one arm) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=Ubd5IHuYlTo" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Superman Flies - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=svq_tDPVl9A" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
            <br/>
                <div className="subtitle">5. Windshield Wiper Prog. {this.stars(2)}</div> <br/>
                Side planks - 90 seconds <br/>
            Side Crunches - 40 reps * 1 set < a href = "https://www.youtube.com/watch?v=E3pHxKVfsz0" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Thread the Needle - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=xXyIJAg8LFU" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Russian Twists - 10 reps * 3 sets < a href = "https://www.youtube.com/watch?v=jIStaPoxupI" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Windshield Wipers(ground) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=hrS3QsNqvTQ" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Windshield Wipers(tucked, on bar) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=xM5ojvBKI94" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Windshield Wipers(extended, on bar) - 3 reps * 5 sets < a href = "https://www.youtube.com/watch?v=cQPehma273s" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
            <br/>
                <div className="subtitle">6. Front Lever Prog. {this.stars(2)}</div> <br/>
                Scapular Shrugs - 5 reps * 5 sets <br/>
            Scapular Pull-ups(tucked) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=OYRAFPM2yDI" > Demo Video  <i className="fas fa-external-link-alt"></i> </a > <br/>
        Assisted Lever Pull - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=q5hXGcAETFM" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Scapular Pull-ups(one leg out or straddle) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=zymHuZDnD5U" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Front Lever - 5 seconds < a href = "https://www.youtube.com/watch?v=TxKoh9NIFtU" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
            <br/>
                <div className="subtitle">7. Inverted Row Prog. {this.stars(2)}</div> <br/>
                Inverted Ring Rows(leaning) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=wZPKoq1Ydcg" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Inverted Ring Rows(one arm) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=C3F4ltRbDOE" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Inverted Ring Rows(legs propped up) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=OdivQZB8oDkg" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Inverted Ring Rows(hanging) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=dZQMlqx9aOk" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
            <br/>
                <div className="subtitle">8. One Arm Pull-up Prog. {this.stars(2)}</div> <br/>
                Assisted Pull-ups - 5 reps * 5 sets <br/>
            Pull-ups - 5 reps * 5 sets <br/>
                One Arm Bar Hold - 30 seconds <br/>
                    Shoulder Pull-ups(One Arm) - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=MjawoDfKqf0" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Weighted Pull-ups - 5 reps * 5 sets <br/>
            Archer Pull-ups - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=P-jeGDxcQZY" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Typewriters - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=fTP7rupsLCg" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        One - Arm Pull-ups - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=RCCYTvxkQWE" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>
        Weighted One - Arm Pull-ups - 5 reps * 5 sets <br/>
            <br/>
                <div className="subtitle">9. Muscle-up Prog.{this.stars(2)}</div> <br/>
                Wide - set Pull-ups - 5 reps * 5 sets <br/>
            Bar to Chest - 5 reps * 5 sets <br/>
                Muscle - ups - 5 reps * 5 sets < a href = "https://www.youtube.com/watch?v=41RQW52vf3U" > Demo Video <i className="fas fa-external-link-alt"></i> </a > <br/>

            </>
        )
    }
    chestInfo(){
        return (
            <>
                <table className="">
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Difficulty</th>
                            <th>Muscles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Knees/Full Ring Flies</td>
                            <td>Hard</td>
                            <td>Shoulders</td>
                        </tr>
                        <tr>
                            <td>Knees/Full Superman Flies</td>
                            <td>Hard</td>
                            <td>Shoulders, Abs</td>
                        </tr>
                        <tr>
                            <td>Ring Dips</td>
                            <td>Medium</td>
                            <td>Triceps, Pecs</td>
                        </tr>
                        <tr>
                            <td>Dragon Flags</td>
                            <td>Hard</td>
                            <td>Abs, Lats</td>
                        </tr>
                        <tr>
                            <td>Planche Push-ups</td>
                            <td>Medium</td>
                            <td>Triceps, Pecs</td>
                        </tr>
                        <tr>
                            <td>Lying/Hanging Windshield Wipers</td>
                            <td>Hard</td>
                            <td>Obliques</td>
                        </tr>
                        <tr>
                            <td>Russian Twists</td>
                            <td>Medium</td>
                            <td>Obliques</td>
                        </tr>
                        <tr>
                            <td>Side Planks</td>
                            <td>Medium</td>
                            <td>Obliques</td>
                        </tr>
                    </tbody>
                </table>

                <div className="subtitle">Ring Flies: {this.stars(2)}</div>This is one of my favorite exercises (inspired by Alexander Megos). Ring Flies will allow you to hang more actively on the wall and build compression strength.  Set the rings shoulder-width apart and a few inches off the ground.
      Put your hands into the rings and rest on your knees.
  <br/> Variations:
                      Lean onto your hands and bring them apart so your nose almost touches the ground.
                      To target your pecs more, you can perform these with your arms rotated outwards so your palms are facing away from you.
                      To adjust difficulty you can allow / prevent your feet from lifting up as you go down.
                      Another way to adjust difficulty is to lower down as if you were doing a ring push-up instead of keeping your arms straight throughout the movement.
                      To do it Flies full difficulty, you can start from a normal push-up position instead.
  <br/> <div className="subtitle">Superman Flies: {this.stars(2)}</div>This is similar to the Ring Flies except when you lean onto your hands, you bring them forward.
                      In this way, they stay roughly shoulder - width apart as you go down.This will target your abs more than the normal Flies.
  <br/> <div className="subtitle">Ring Dips: {this.stars(2)}</div>These are much harder than normal dips and it is recommended you flare the rings out each time you reach the top of the movement.
  <br /> <div className="subtitle">Dragon Flags: {this.stars(3)}</div>Dragon Flags are extremely difficult so one should work up to them using leg - ups and negatives.
  <br /> <div className="subtitle">Planche Push-ups: {this.stars(2)}</div>This an easily - adjustable gymnastics exercise that builds pushing power.

            </>
        )
    }
    backInfo(){
        return (
            <>
            <table className="">
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Difficulty</th>
                        <th>Muscles</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Scapular pull-ups</td>
                        <td>Easy</td>
                        <td>Trapezius</td>
                    </tr>
                    <tr>
                        <td>Standing/Hanging Inverted Rows</td>
                        <td>Easy</td>
                        <td>Trapezius</td>
                    </tr>
                    <tr>
                        <td>Tucked/Straddled/Full Front Lever</td>
                        <td>Hard</td>
                        <td>Lats, Trapezius, Triceps</td>
                    </tr>
                    <tr>
                        <td>Wide-set Pull-ups</td>
                        <td>Medium</td>
                        <td>Triceps, Lats</td>
                    </tr>
                    <tr>
                        <td>IYT's</td>
                        <td>Easy</td>
                        <td>Triceps, Back</td>
                    </tr>
                </tbody>
            </table>

                    <p>
                    <div className="subtitle">Scapular Pull-ups: {this.stars(1)}</div>Acquiring scapula (shoulder blade) strength results in greater control of your arms since your scapulae control them.
                        The way to perform these is to hang on a bar with your hands shoulder-width.
                        First, you want to sink your head between your shoulders then you want to shrug so you enter an active hang.
        <br /><div className="subtitle">Front Lever: {this.stars(2)}</div> The Front Lever is well-known for being the one of the hardest pushing/core exercises amongst gymnasts and for good reason. (inspired by Sean McColl)

            </p>
            </>
        )
    }
    armInfo(){
        return (
            <>
                <table className="">
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Difficulty</th>
                            <th>Muscles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Assisted One-arm Pull-ups</td>
                            <td>Medium</td>
                            <td>Triceps</td>
                        </tr>
                        <tr>
                            <td>Type-writers</td>
                            <td>Medium</td>
                            <td>Triceps</td>
                        </tr>
                        <tr>
                            <td>Bar to Chest</td>
                            <td>Medium</td>
                            <td>Triceps</td>
                        </tr>
                        <tr>
                            <td>Muscle-ups</td>
                            <td>Medium</td>
                            <td>Triceps</td>
                        </tr>
                        <tr>
                            <td>Weighted Pull-ups</td>
                            <td>Medium</td>
                            <td>Triceps</td>
                        </tr>
                        <tr>
                            <td>Muscle-ups</td>
                            <td>Medium</td>
                            <td>Triceps</td>
                        </tr>
                        <tr>
                            <td>Weight Ring Hold</td>
                            <td>Medium</td>
                            <td>Hands</td>
                        </tr>
                        <tr>
                            <td>One-arm Static Bar Holds (30sec)</td>
                            <td>Medium</td>
                            <td>Hands</td>
                        </tr>
                    </tbody>
                </table>

                <div className="subtitle">Type-writers: {this.stars(2)}</div> While lock-off strength is important it is debatable whether simply doing it is the best way of improving it.
  <br /> <div className="subtitle">Bar to Chest: {this.stars(2)}</div> These are pull-ups that are dynamic and build explosive power.
  <br /> <div className="subtitle">One-arm Pull-up: {this.stars(2)}</div> (Inspired by Alex Puccio) While difficult, make sure you squeeze the bar as hard as you can, start with your body perpendicular to the bar, and fold your body inwards.

            </>
        )
    }
    legInfo(){
        return (
            <>

            <table className="">
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Difficulty</th>
                        <th>Muscles</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Butterfly</td>
                        <td>Easy</td>
                        <td>Adductors</td>
                    </tr>
                    <tr>
                        <td>Side-split</td>
                        <td>Easy</td>
                        <td>Adductors</td>
                    </tr>
                    <tr>
                        <td>Knee to Chest</td>
                        <td>Easy</td>
                        <td>Hip-flexors</td>
                    </tr>
                    <tr>
                        <td>Knee-split</td>
                        <td>Easy</td>
                        <td>Adductors</td>
                    </tr>
                    <tr>
                        <td>Pidgeon Pose</td>
                        <td>Easy</td>
                        <td>Adductors</td>
                    </tr>
                    <tr>
                        <td>Frog Stretch</td>
                        <td>Medium</td>
                        <td>Adductors</td>
                    </tr>
                    <tr>
                        <td>Toe Touch</td>
                        <td>Easy</td>
                        <td>Hamstrings</td>
                    </tr>
                </tbody>
            </table>

            <p>
                Lower body strength is not as important as lower body flexibility, namely in the hip flexors and adductors.
                This is because flexibility is what allows you to place head-high heel hooks (like Ashima Shiraishi), reach very far high/far footholds, stay closer to the wall, match feet to hands, etc.
                On the other hand, strength is mostly only tested when stepping off a single foothold with the other leg disengaged or jumping off large holds.
                A good benchmark is being able to do a single pistol squat on each side.
  </p>
  </>
        )
    }
    moreInfo(){
        const tips = [<>Step using the <mark>tip of your shoe</mark>.Use the point of your shoe to step on holds and be conscious of whether the left edge, right edge, or center point should be used. </>
        ,<>Keep your <mark>arms straight</mark>.Keep them straight as often as you can but if you need to move into a powerful move soon after then keep them slightly bent since pulling up from a straight arm position is much harder.Also bend them at the later stage of a movement if it is very long.</>
        ,<><mark>Stay close</mark> to the wall, especially your hips.Unless you need to jump out over an overhang in which case staying close will increase your swing.</>
        ,<><mark>Look at your hands and feet</mark> as you place them.A good exercise is to count to 2 before you a place a hand or foot on a hold.It has been reported that using your eyes is vastly more important than feeling that your toe on a hold or hearing your toe step on a hold.</>
        ,<><mark>Climb silently</mark> especially when stepping on holds.This will ensure that you are moving with control and not rushing things desperately.</>
        ,<><mark>Read the route</mark> from the ground.Condition the correct neurons for firing quickly, in sync, and on time by pantomiming the moves from the ground even though it may look silly.</>
        ,<>Use same side - foot to reach with a hand.For example, if you are reaching up with your right hand try to step off hard from your right foot.Harder climbs may force you to use the opposite foot.</>
        ,<><mark>Turn away from the direction you are reaching</mark>.This is useful on overhangs.If you are reaching up with your right hand, turn your body to the left while making the move.</>
        ,<><mark>Drop knees</mark>.This facilitates the above movement.If you are on an overhang and you have a relatively high foot, turn your body to the opposite side you are reaching by stepping on the hold and then turning your knee downwards.</>
        ,<>Hand match by using <mark>piano matching</mark> as often as you can.This means removing a finger at a time from one hand while placing a finger on one at a time with the other hand.</>
        ,<><mark>Minimize force</mark> you use to grab holds.If you can hang on a hold by grabbing less hard, then do it.Grab harder only when you need to like when you are powering off a hold.</>
        ,<>Foot matching is best done by first crossing your heels and placing your toes over each other.Wiggle your lower foot out rapidly then let your new foot drop into place.</>
        ,<>Learn how to use different hold types: slopers, jugs, crimps, pinchers, finger pockets. </>
        ,<>Slopers are often best gripped in a <mark>meat hook</mark> position where your fingers are pointing along the wall rather than towards the wall.Your fingers can face either direction.Meat hooking likely works because the human hand can exert greater grip strength if the wrist is angled slightly outwards.If you are meat hooking multiple slopers you can create compression or expansion oppositional forces which will hold you on the wall.Keep your wrist flexed downwards whenever possible relative to your hand to increase friction.This is assisted by staying low with your whole body when on slopers.When moving on slopers, move slowly since they are obviously often slippery. </>
        ,<>Jugs are great for rests.Learn how to abuse them by heel hooking, toe hooking them, etc.</>
        ,<>Crimps should be grabbed open handed as often as possible when you first start climbing so as to protect your tendons.This means not bending your fingers back when grabbing them.A closed grip, which usually means putting your thumb over your index fingers, can be useful to execute moves when you need to weight crimps more and you are an experienced climber.</>
        ,<>Use your thumb whenever you can, especially on pinchers.Taking advantage of opposition is very important in climbing and your thumbs are valuable for providing oppositional force relative to your fingers.Even if it feels slightly awkward to stretch your grip around a large pincher, it may be what you need.</>
        ,<>For finger pockets, prioritize using your <mark>middle two</mark> fingers whenever you can since they can exert the most force.You can switch to other fingers to rest your strongest ones though.</>
        ,<><mark>Avoid readjusting</mark> when you place a foot / hand down.A good exercise is trying a group of routes but not letting you move your hands or feet once you place them on a hold.This will teach accurate placement.</>
        ,<>Maximize the number of fingers you put on holds.Each time you let a finger slip off, you can imagine that you are reducing your force by 25 % since you have 4 fingers.</>
        ,<>Leave or make room to put both hands on holds when you expect that you will need to.</>
        ,<>Balance using your leg to counterbalance.A good exercise is standing with your legs together and arms straight above your head.Slowly lower one arm and then raise one leg to counteract the movement and balance.Repeat with the other side.</>
        ,<>Memorize holds underneath ledges or around aretes.You probably won’t be able to locate them in the moment.Use chalk lines to indicate where they are.</>
        ,<>Smear more and harder.Smearing can allow you to pincer around an arete which creates opposition with your legs like a bike. Use the entire side of your foot or the bottom part of the shoe when possible.</>
        ,<>Learn to flag.Use the side of your foot instead of the front of your foot when doing large “drive by” moves to flag especially hard.Instep flagging will feel better when standing upright than back flagging.</>
        ,<>Mantling.Use the muscle below your armpit to mantle higher rather than your arms, which should be straight.</>
        ,<><mark>Heel hooking</mark> - Have knee pointing away from wall while you set the heel down.Point toe down to lock it as knee / shin bone moves towards the wall.</>
        ,<><mark>Toe hooking</mark> - This is more about using core tension rather than using leg muscles.Throw your body backwards, away from your toe hook, if you need to gain tension.</>
        ,<>Dynos - You can do straight arm vs bent arm dynos depending on steepness.look at the target hold while in the air.bend your arms to control the swing </>
        ,<>Knee locks - Adjust the angle of your shin bone to make it fit.</>
        ,<>Biking - Simultaneously Toe hooking and stepping down on a hold with a foot will keep your foot in place.</>
        ,<>Camming - Often when heel hooking you can turn your toes into the wall hard to jam your foot in place.</>
        ,<>Use opposition to stay on wall.Expansion and compression will keep you on the wall when the individual holds themselves will not.This means pulling holds away from each other or pushing them towards each other.</>
        ,<><mark>Look for chalk and rubber</mark> on the holds to determine where to grab them.This can suggest heel / toe hooks which are tricky to assume otherwise.</>
        ,<>When climbing dynamically, use momentum from eccentric movements to make large moves.So when reaching a certain direction, move the opposite way first to gain momentum.When climbing statically let the momentum dissipate before making another move.It’s good to try both methods on a given move.</>
        ,<>Use bolt holes on holds as thumb catches. </>
        ,<>Use aretes even if momentarily.</>
        ,<>Use volumes properly.Step on outermost portion to keep body angled into wall even though it is counterintuitive.</>
        ,<>Use pogos for stepping off a foot which is on the opposite side relative to the one you are reaching.This utilizes leg momentum and you want to swing your same - side foot while keeping it straight.</>
        ,<>Point your toe down on holds that are angled down.This is especially important on overhangs.</>
        ,<><mark>Head momentum</mark> - Throwing your head into the wall while you make a move can assist in keeping you into the wall.</>
        ,<>Start with non-stepping foot as close to wall as possible when getting up on the starting holds.This way it doesn’t have to fly into the proper flagging position which would waste energy and potentially throw you off balance. </>
        ,<>Use warm up to calibrate your feet and ensure they are taking as much weight as possible.</>
        ,<>Sync your exhaling with your with movements.</>
        ,<>The most important muscles to train are your trapezius, rhomboids, triceps, and lats.</>
        ,<><mark>Climb faster</mark>.If you can do the same moves but in a shorter amount of time without swinging recklessly, you are objectively climbing better.Your performance / max strength will drop significantly after being on the wall roughly more than a minute. </>
        ,<>Learn dyno techniques.Look at the target hold as you jump; don’t close your eyes.If you need to also move horizontally, the lead foot should point in that direction and the back foot should point into the wall.When controlling the target hold, bend your biceps to control the swing and straddle + bend your legs.Aiming your fingers a few inches more into the wall can help you reach the target hold.Squat stretches and depth jumps can improve jump height.</>
            ,<>If a move seems far, you can line it up with your wingspan from the ground, <mark>count the number of bolt holes</mark> it spans, and measure the distance from the nearest foot chip to evaluate it better.</>
        ,<>View climbs from multiple angles. Even pros keep their chalk bags far from the wall or use liquid to chalk to stall themselves and thus, to force themselves to look at the wall from different perspectives and take longer breaks.</>
        ,<>Sometimes different shoes do make a difference. Adam Ondra will wear two different shoes at once if he needs to stick a critical heel hook.</>
        ,<>Stretch more.Akiyo Noguchi was allowed to use a volume from a completely different but neighboring climb since she had enough, strong active flexibility to reach it.</>
        ,<>Use passive flexibility instead of active whenever possible.</>
        ,<>Learn calisthenics / gymnastics for basic principles.</>
        ,<>Doing yoga doesn’t make for a great rest day.</>
        ,<>Lead movements with your hips. Campusing can help teach this.</>]
        const tipLis = tips.map((tip, idx)=> (

            <li key={idx}>{idx+1}. {tip}</li>
            ))
        return (
            <>
            <div className="subtitle">40+ Tips for Rock Climbing</div>
            <ul>
            {tipLis}
            </ul>


<div className="subtitle"> <h1> Customizing </h1></div>
<h3> So you want to form your own plan? Great idea! Pick 2-3 exercises under each of the following headers and do them 3-4 times a week.
  You should stick to these for at least 6 weeks to see results.  Try not to cause "muscle confusion". </h3>
<p className="">If training power, complete 5 sets each with 5 reps.
Take up to 3 minutes rest between sets.  You can take more or less time as long as you feel fully recovered before starting new sets.
During the following week, you should try to add 1 more rep to each set.
  Then, once you can do 7-10 reps per set, you would need to add ~5% more weight (factoring bodyweight) and reset to 5 reps/set. </p>
<p className="">If training endurance, complete 3 sets each with 10 reps. Take .5-1 minute rest between sets.
You want to take shorter rests so that you work out your muscles to exhaustion.
Also, you should do as many reps as you are able in the final set.
During the following week, you should try to add 1 more rep to each set.
  Then, once you can do 15-20 reps per set, you would need to add ~5% more weight (factoring bodyweight) and reset to 10 reps/set</p>
<p>Don't overexert yourself. This goes without saying but there are a lot of options at your disposal you're feeling overworked:
  	<br/>Reduce weight
  	<br/>Switch to a different variation of the exercise
  	<br/>Hold in the contracted position(isometric)
  	<br/> Come out of the contracted position slowly(perform a negative / eccentric)
  	<br/> Stop the set
  <br/> As you can see, there are many options that aren't even mutually exclusive that can keep you safe from injury but still keep your time-under-tension high per set (~40sec).
  	</p >

            <div className="subtitle">My personal workout from 10/2018</div><br/>
            <div >
                Depth Jumps<br/>
                Squat Jumps<br/>
                Front Lever<br/>
                Weighted One-Arm Pull-Ups<br/>
                30degree Cross<br/>
                Compressions<br/>

                9/2018<br/>
                <a href="https://www.youtube.com/watch?v=357JIuFF4-Q"> Swinging Ring Support Hold  <i className="fas fa-external-link-alt"></i> </a> 15 secs x 1 set <br/>
                30 Degree Ring Cross 10 secs x 3 sets 3min rests<br/>
                Straight Lever Pulls 5reps x 3 sets 3min rests<br/>
                <a href="https://youtu.be/dtsrFeWjx3g?t=698"> Tucked Planche Swings  <i className="fas fa-external-link-alt"></i> </a> 10reps x 3 sets 3min rests<br/>
                Repeaters on 7mm edge 6reps x 3 sets 3min rests<br/>
                <a href="https://youtu.be/dtsrFeWjx3g?t=1049"> Ring Taps  <i className="fas fa-external-link-alt"></i> </a> 5reps x 3 sets 3min rests<br/>
                Weighted (+35lb) Repeaters on 10mm edge with 6reps x 3 sets 3min rests<br/>
                Dragon Flags 3reps x 3 sets 3 min rests<br/>
                <a href="https://youtu.be/yUkD5fBD3rA?t=266"> Asymmetrical Ring Flies  <i className="fas fa-external-link-alt"></i> </a> 10 reps x 3 sets 3min rests<br/>
                One Arm Flies 10 reps x 3 sets 3min rests<br/>
                Weighted One-Arm Pullups 1rep x 3 sets 3min rests 5lb<br/>
            </div>





<div className="title">Completed Goals</div>
<iframe class="center" width="560" height="315" src="https://www.youtube.com/embed/41RQW52vf3U" frameborder="0" allow="autoplay; encrypted-media" allowFullScreen title="muscle-up"></iframe>
<iframe class="center" width="560" height="315" src="https://www.youtube.com/embed/RCCYTvxkQWE" frameborder="0" allow="autoplay; encrypted-media" allowFullScreen title="pull-up"></iframe>
<iframe class="center" width="560" height="315" src="https://www.youtube.com/embed/TxKoh9NIFtU" frameborder="0" allow="autoplay; encrypted-media" allowFullScreen title="front-lever"></iframe>
        </>
        )
    }
    render(){

        let info
        switch(this.state.type){
            case "Intro":
                info = this.introInfo()
                break
            case "On The Wall":
                info = this.climbingInfo()
                break
            case "Popular":
                info = this.intermediateInfo()
                break
            case "Fingers":
                info = this.fingerInfo()
                break
            case "Calisthenics":
                info = this.calisthenicsInfo()
                break
            case "Chest":
                info = this.chestInfo()
                break
            case "Back":
                info = this.backInfo()
                break
            case "Arms":
                info = this.armInfo()
                break
            case "Legs":
                info = this.legInfo()
                break
            case "40 Quick Tips":
                info = this.moreInfo()
                break
            default:

            // case
        }

        let workoutTypes = ["On The Wall", "Popular", "Fingers", "Calisthenics", "Chest", "Back", "Arms", "Legs", "40 Quick Tips"]
        let colorTypes = ["#8884d8","#83a6ed","#8dd1e1","#82ca9d","#a4de6c","#efb648"]
        const buttons = workoutTypes.map((workoutType, index) => {
            const color = colorTypes[index % 7]
            return (
                <Button kind="primary" color={color} key={index} text={ workoutType} onClick={this.handleClick(workoutType, color)} />
            )
        }
        )


        return (
            <div className="training-guide" style={{ background: '#eee' }}>
                <strong>Workout Types:</strong>
                <div className="links">
                    {buttons}
                </div>
                <div style={{background: 'white', borderRadius: "8px", padding: '14px', margin: '5px'}}>
                    <div className="title workout-type" style={{color: this.state.color}}>{this.state.type}
                    <hr style={{border: 'none', backgroundColor: '#333', height: '1px'}}/>
                    </div>
                    {info}
                </div>

            </div>
        )
    }
}
export default TrainingGuide