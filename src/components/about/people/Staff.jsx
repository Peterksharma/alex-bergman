import ClippedPortrait from "@/components/about/people/ClippedPortrait";
import { Card, CardContent } from "@/components/ui/card";

export default function Staff() {
    return (
        <div className="py-24 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4">
                <div className="relative flex items-center justify-center">
                    {/* Portrait - positioned absolutely to overlap */}
                    <div className="absolute left-0 z-10">
                        <ClippedPortrait />
                    </div>

                    {/* Content Card */}
                    <Card className="ml-[350px] bg-gradient-to-br from-gray-600 to-gray-700 border-0 shadow-2xl">
                        <CardContent className="pl-48 pr-12 py-12">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold mb-2">
                                    <span className="text-blue-400">Meet</span>{" "}
                                    <span className="text-white">Alex Bergman</span>
                                </h2>
                                <p className="text-gray-300 text-lg font-semibold">
                                    Owner and Founder of A.R.Bergman Drafting and Design
                                </p>
                            </div>

                            {/* Bio Content */}
                            <div className="text-gray-200 text-base leading-relaxed space-y-4 max-w-2xl">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras blandit ligula vel sem fermentum, vel fringilla urna mattis. Vestibulum lobortis non augue sed faucibus. Donec eu neque id massa rutrum iaculis vitae eu elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam faucibus ante quis ante placerat finibus. Sed ultrices hendrerit elementum. Nullam egestas vulputate ante eget ornare. Fusce dapibus nec nisi a rutrum. Nulla ac eros ex. Donec ac sollicitudin nulla. Integer pretium felis vel orci commodo, luctus facilisis risus suscipit. Suspendisse quis cursus purus, eget porta eros.
                                </p>
                                <p>
                                    Nunc imperdiet nulla vitae metus rutrum scelerisque. Suspendisse vel dignissim enim, ac suscipit ipsum. Nullam pulvinar, massa nec cursus porttitor, justo magna vehicula arcu, fermentum euismod nisl felis a augue. Quisque sit amet ipsum in ligula semper finibus a ac leo. Praesent sed congue orci. In hac habitasse platea dictumst. Etiam ut placerat ipsum. Maecenas cursus, mi in mollis pharetra, sapien mi consequat sem, eu consectetur nisl lacus at justo. Pellentesque pulvinar augue id laoreet pretium. Pellentesque tincidunt, odio in facilisis feugiat, lorem nisl ultrices felis, sit amet congue nunc dolor eu turpis.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}