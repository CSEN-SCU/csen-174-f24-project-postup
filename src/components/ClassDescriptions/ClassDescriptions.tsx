import {  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useState } from "react";
import {Course} from "@/app/utils/types";
import { getPrettyName } from "@/app/utils/helper";

interface ClassDescriptionsProps {
    course: Course;
}

export default function ClassDescriptions({ course }: ClassDescriptionsProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
        <span className="cursor-pointer text-sm border-b-black">
          {course.name}
        </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{course.name}</DialogTitle>
                    <DialogDescription>
                        {getPrettyName(course.id)} | {course.unit} Units
                    </DialogDescription>
                </DialogHeader>
                <div className = "flex space-x-4">
                    <div>
                        <h4 className="font-bold mt-4">Class Description</h4>
                        <p className = "items-center">{course.description} test</p>
                    </div>
                        <Separator orientation="vertical" />
                    <div>
                        <h4 className="font-bold mt-4">Prerequisites</h4>
                        <p>These are the prerequisites for this class.</p>
                        <Separator />
                        <h4 className="font-bold mt-4">Corequisites</h4>
                        <p>These are the corequisites for this class.</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
}
