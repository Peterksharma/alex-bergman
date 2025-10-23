import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { services } from "@/data/services"

export default function Services() {
  //this needs to be finised up
  function renderServiceCards(data) { 
    return services.map((data, index) =>{
      return(
      <div key={index}>
        <Card>
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
              <CardDescription>{data.description}</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    )
    })
  }
  
  
  return( 
    <div>
      {renderServiceCards(services)}
    </div>
  )
}