import DocumentTile from "./DocumentTile"
export default function Documents() {

    return (
        <div className="w-full rounded-lg shadow-md">
            <h1 className="px-3">Documents</h1>
            <DocumentTile  topic='Class 12th' description='Syllabus of 2024 batch' size='12 pages/ 360KB'/>
            <DocumentTile  topic='Preparation Tips' description='Syllabus of 2024 batch' size='12 pages/ 360KB'/>
            <DocumentTile  topic='Exempler' description='Syllabus of 2024 batch' size='12 pages/ 360KB'/>
            <DocumentTile  topic='Science Syllabus' description='Syllabus of 2024 batch' size='12 pages/ 360KB'/>

        </div>

    )
}