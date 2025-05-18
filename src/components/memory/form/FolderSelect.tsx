
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FolderSelectProps {
  selectedFolder: string;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
  folders: string[];
}

export const FolderSelect = ({ selectedFolder, setSelectedFolder, folders }: FolderSelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Organize in Folder (Optional)</Label>
      <Select value={selectedFolder} onValueChange={setSelectedFolder}>
        <SelectTrigger>
          <SelectValue placeholder="Select a folder" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {folders.map((folder) => (
              <SelectItem key={folder} value={folder}>
                {folder}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
