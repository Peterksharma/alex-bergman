import { Card } from "../ui/card"

export default function ContactForm() {


    const sumbitEmail = (e) => {
        e.preventDefault()

        
    }

    return (
        <div>
            <Card>
                <div>
                    <form>
                        <label>Email: </label>
                        <input
                            type='email'
                            id="email"
                            name="emailAddress"
                            placeholder="Email Address goes here"
                            required
                            className="border-2 w-[400px]"
                            onSubmit={sumbitEmail()}
                        />
                        <input type="submit"/>
                    </form>
                </div>

            </Card>
        </div>
    )
}