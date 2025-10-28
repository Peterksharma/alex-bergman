import AboutTrustCards from "@/components/about/trustCards";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";

export default function About() {


const expertiseCardData = [
  {
    title: 'Residential Construction',
    content: 'Mid-size residential projects, additions, remodels, and auxiliary structures.',
  },
  {
    title: 'Residential Construction',
    content: 'Mid-size residential projects, additions, remodels, and auxiliary structures.',
  },
  {
    title: 'Residential Construction',
    content: 'Mid-size residential projects, additions, remodels, and auxiliary structures.',
  },
]

function renderExpertiseCards() {
  return (
    expertiseCardData.map((data, index) => (
      <div key={index} className="pb-4">
        <Card>
          <CardHeader className='font-bold'>{data.title}</CardHeader>
          <CardContent>{data.content}</CardContent>
        </Card>
      </div>
    ))
  )
}

  function renderAboutMe() { 
    return(
      <div>
        <Image 
          src='/assets/profile.jpg'
          alt='A bust shot of Alex standing in front of a nice wall.'
          width='300'
          height='300'
          className="border-4 rounded-xl  border-gray-100"
        /> 
      </div>
    )
  }



  return (
    <div className="bg-gray-900">
      <div className="text-center p-8 text-gray-100">
        <h1 className="text-4xl pb-4">
          About A.R.Bergman Drafting and Design
        </h1>
        <div>
          Founded in 2008 in Olympia, Washington, we're committed to producing
          <br />
          high-quality building plans at affordable rates.
        </div>
        <div className="flex justify-evenly gap-8 pt-16">
          <div className="flex pl-16">
          {renderAboutMe()}
          </div>
          <div className="col-span-2 bg-gray-700 text-gray-100 h-[500px] w-[800px] t">
          
            <h2>Meet Alex Bergman</h2>
            This is the about text.
          </div>
        </div>
      </div>
      <div className="pb-8 m-8 flex justify-center">
        <Card className='bg-gray-900 text-gray-100 border-gray-700 border-2 w-[60vw]'>
          <div className="text-center flex flex-col items-center">
            <FaRegHeart className="h-[5vh] w-[5vw] text-blue-500 hover:text-pink-600 transition-all duration-800 ease-in-out hover:scale-150" />
            <h2 className="text-2xl pb-4 font-bold">Our Mission</h2>
            <div>
              <div className="pb-4 text-lg">
                <p>Our work is mostly about making the world a better place,</p>
                <p className="text-blue-500 font-bold">
                  which is why 3% of all profits are donated to charitable
                  organizations within our community.
                </p>
              </div>
              <div className="pb-2">
                Click here to support the current charity
              </div>
              <div>
                <Button
                  variant="cta"
                  className="h-[8vh] w-[16vw] hover:bg-red-700"
                  href="https://www.redcross.org/donate/donation.html/"
                >
                  Click to Donate to the <br />
                  American Red Cross{" "}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="border-t-2 border-b-2 border-gray-400">
        
      <AboutTrustCards />
      </div>
      <div className="pt-8">
        <h2 className="text-center text-2xl font-bold pb-8 text-gray-100 "> Our Expertise </h2>
        <div className="flex justify-center">
          <div>
            {renderExpertiseCards()}
          </div>
        </div>
      </div>
    </div>
  );
}

