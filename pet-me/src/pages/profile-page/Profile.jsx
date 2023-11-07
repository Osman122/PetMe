const Profile = () => {
    return ( 
        <div className="container bg-light rounded-5 mt-4">
            <h4 className="text-center  pt-4">Profile Information</h4>
            <div className="row ms-2">
            <p className="text-uppercase" style={{color:'RGB(255,0,0,0.7)' , fontSize:'12px'}}>* requierd fields</p>

                <div className="col-6">
                    <div className="m-3"> 
                        {/* <label htmlFor="first-name" className="text-capitalize m-2">first name</label> */}
                        <input type="text" name="first-name" className="form-control w-100" placeholder="First Name"/>
                    </div>
                    <div className="m-3"> 
                        {/* <label htmlFor="username" className="text-capitalize m-2">username</label> */}
                        <input type="text" name="username" className="form-control w-100" placeholder="Username"/>
                    </div>
                </div>
                <div className="col-6">
                <div className="m-3"> 
                        {/* <label htmlFor="last-name" className="text-capitalize m-2">last name</label> */}
                        <input type="text" name="last-name" className="form-control w-100" placeholder="Last Name"/>
                    </div>
                    <div className="m-3"> 
                        {/* <label htmlFor="email" className="text-capitalize m-2">email</label> */}
                        <input type="email" name="last-name" className="form-control w-100" placeholder="Email"/>
                    </div>

                </div>

            </div>


            
        </div>
     );
}
 
export default Profile;