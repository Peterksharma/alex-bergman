import AboutTrustCards from "@/components/about/trustCards";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRegHeart } from "react-icons/fa";

export default function About() {
  return (
    <div>
      <div className="text-center p-8 ">
        <h1 className="text-4xl pb-4">
          About A.R.Bergman Drafting and Design
        </h1>
        <div>
          Founded in 2008 in Olympia, Washington, we're committed to producing
          <br />
          high-quality building plans at affordable rates.
        </div>
      </div>
      <div className="pb-8 m-8">
        <Card>
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
                  className="h-[8vh]"
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
      <AboutTrustCards />
      <div className="pt-8">
        <h2 className="text-center text-2xl font-bold pb-8 "> Our Expertise </h2>
        <Card>
          <CardHeader className='font-bold'>Residential Construction</CardHeader>
          <CardContent>
            Mid-size residential projects, additions, remodels, and auxiliary
            structures.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Residential Construction</CardHeader>
          <CardContent>
            Mid-size residential projects, additions, remodels, and auxiliary
            structures.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Residential Construction</CardHeader>
          <CardContent>
            Mid-size residential projects, additions, remodels, and auxiliary
            structures.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
