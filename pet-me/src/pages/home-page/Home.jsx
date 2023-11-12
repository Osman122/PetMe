import Post from "../../components/home/Post";

const Home = () => {
    return ( 
        <section style={{backgroundColor:'#eee'}}>
            <div class="container posts my-5 py-5">
                <div class="row d-flex justify-content-center">
                <div class="col-md-12 col-lg-10 col-xl-8">
                        <Post/>
                    </div>
                <div class="col-md-12 col-lg-10 col-xl-8">
                    <Post/>
                </div>
                <div class="col-md-12 col-lg-10 col-xl-8">
                    <Post/>
                </div>
                </div>
            </div>
        </section>

     );
}
 
export default Home;