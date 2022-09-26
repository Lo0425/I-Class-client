const Main = () => {
  return (
    <>
      <div>
        <div className="sm:flex sm:justify-center block w-screen items-center h-screen">
          <div className=" sm:mr-0 block p-6 rounded-lg shadow-lg bg-white max-w-sm my-auto mx-auto ">
            <h1 className="sm:text-left text-center text-gray-900 text-4xl leading-tight font-medium mb-2">
              The easiest way to connect your classroom
            </h1>
            <h6 className="sm:text-left text-center text-gray-400 text-xl pb-2">
              Loved by more than 50 million students and parents. Free for
              teachers, forever.
            </h6>
          </div>

          <div className="sm:text-left sm:ml-0 text-center block rounded-lg shadow-lg bg-white max-w-sm my-auto mx-auto">
            <img
              src="https://img.freepik.com/free-vector/classroom-school-with-chalkboard-scene_25030-39313.jpg?w=1380&t=st=1663157954~exp=1663158554~hmac=c4af00a06e1ea07f732d09a4503c4f08ec8fb0a469e7174ba0cd3866f5a2d2de"
              style={{ width: "700px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
