import * as NodeFS from "fs/promises";
import {
    FileAccessMode,
    FileCopyMode,
    FileOpenFlag,
    FileOpenMode,
    SymbolicLinkType
} from "../constants/constants.well";
import {
    DirectoryNotFoundException,
    FileAlreadyExistsException,
    FileNotFoundException,
    FileSystemException
} from "../exceptions/exceptions.well";
import { Path } from "./../path/path";
import { File } from "./../file/file";

/**
 * FileSystem
 *
 * A class abstracting FileSystem operations.
 */

export class FileSystem {

    private constructor() {}

    /**
     * Access()
     *
     * Tests a user's permissions for the file or directory specified by path. The mode argument is an optional
     * integer that specifies the accessibility checks to be performed.
     *
     * If the accessibility check is successful, the promise is resolved with no value. If any of the accessibility
     * checks fail, a FileSystemException is thrown,
     * @param path The path to test.
     * @param mode the mode.
     */

    public static async Access(path: Path, mode: FileAccessMode = FileAccessMode.F_OK): Promise<void> {
        try {
            await NodeFS.access(path.toString(), mode)
        }
        catch(e) {
            throw new FileSystemException((e as Error).message);
        }
    }

    /**
     * ChangeSymbolicLinkOwner()
     *
     * Changes the ownership on a symbolic link.
     * @param path the path
     * @param uid the user id
     * @param gid the group id.
     * @throws FileSystemException when there is an error completing the operation.
     */

    public static async ChangeSymbolicLinkOwner(path: Path, uid: number, gid: number): Promise<void> {
        try {
            await NodeFS.lchown(path.toString(), uid, gid);
        }
        catch (e) {
            throw new FileSystemException((e as Error).message);
        }
    }

    /**
     * Contains()
     *
     * Determines if a file or directory exists in the given path.
     * @param path The path to the file or directory.
     * @returns TRUE if the file exists. FALSE otherwise.
     */

    public static async Contains(path: Path): Promise<boolean> {
        try {
            await NodeFS.access(path.toString());
            return true;
        }
        catch(e) {
            return false;
        }
    }

    /**
     * CopyFile()
     *
     * copies source to destination. By default, destination is overwritten if it already exists.
     * @param source the path of the file to copy.
     * @param destination the destination to copy to.
     * @param createDirIfNotExists if true, the destination file's directory will be created if it does not exist. Defaults to false.
     * @param mode Optional modifiers that specify the behavior of the copy operation.
     * @throws FileSystemException when there is an error completing the operation.
     * @throws FileNotFoundException if the source path does not exist.
     */

    public static async CopyFile(source: Path, destination: Path, createDirIfNotExists: boolean = false, mode: FileCopyMode|null = null): Promise<void> {
        // make sure the file exists.
        if (!await FileSystem.Contains(source)) {
            throw new FileNotFoundException();
        }

        // check if the directory exists 
        const destinationDirectory = destination.dirname();
        const destinationDirExists = await FileSystem.Contains(destinationDirectory);

        if (!destinationDirExists && createDirIfNotExists) {
            // create te directory.
            await FileSystem.CreateDirectory(destinationDirectory); 
        }
        else {
            // throw an error.
            throw new DirectoryNotFoundException("Destination Directory not found.");
        }

        // copy the file.
        try {
            const mod = mode !== null ? mode : 0;
            await NodeFS.copyFile(source.toString(), destination.toString(), mod);
        }
        catch(e) {
            throw new FileSystemException((e as Error).message);
        }
    }

    /**
     * CreateDirectory()
     *
     * creates a directory.
     * @param path the path of the directory to create.
     * @throws FileSystemException when there is an error completing the operation
     */

    public static async CreateDirectory(path: Path): Promise<void> {
        try {
            await NodeFS.mkdir(path.toString(), {
                recursive: true
            });
        }
        catch(e) {
            throw new FileSystemException((e as Error).message);
        }
    }

    /**
     * CreateFile()
     *
     * creates a file.
     * @param path the path of the file.
     * @param createDirIfNotExists if true, the destination file's directory will be created if it does not exist. Defaults to false.
     * @throws FileAlreadyExistsException when the file being created already exists.
     * @throws DirectoryNotFoundException when the file directory does not exist.
     * @throws FileSystemException when there is an error completing the operation.
     */

    public static async CreateFile(path: Path, createDirectoryIfNotExists: boolean = false): Promise<void> {
        // make sure the path is available.
        if (await FileSystem.Contains(path)) {
            throw new FileAlreadyExistsException();
        }

        // make sure the directory exists.
        const pathDir = path.dirname();
        const directoryExists = await FileSystem.Contains(pathDir);

        if (!directoryExists) {
            if (createDirectoryIfNotExists) {
                // create the path directory
                await FileSystem.CreateDirectory(pathDir);
            }
            else {
                // throw an error.
                throw new DirectoryNotFoundException(`Directory ${pathDir.toString()} not found`);
            }
        }

        // create the file.
        try {
            await NodeFS.writeFile(path.toString(), "");
        }
        catch(e) {
            throw new FileAlreadyExistsException();
        }
    }

    /**
     * CreateLink()
     *
     * Creates a new (hard) link from the existingPath to the newPath.
     * @param existingPath the existing path from which to create the new link form.
     * @param newPath the new path.
     * @throws FileSystemException when there is an error completing the operation.
     */

    public static async CreateLink(existingPath: Path, newPath: Path): Promise<void> {
        try {
            await NodeFS.link(existingPath.toString(), newPath.toString());
        }
        catch(e) {
            throw new FileSystemException((e as Error).message);
        }
    }

    /**
     * CreateSymbolicLink()
     * 
     * Creates a symbolic link.
     *
     * The type argument is only used on Windows platforms and can be one of symbolicLinkType.DIRECTORY, SymbolicLinkType.FILE,
     * or SymbolicLinkType.JUNCTION. Windows junction points require the destination path to be absolute.
     * When using SymbolicLinkType.JUNCTION, the target argument will automatically be normalized to absolute
     * path.
     * @param target the target.
     * @param path the path of the symlink.
     * @param type the symlink type. Defaults to SymbolicLinkType.FILE
     * @throws FileSystemException whe nthere is an error completing the operation.
     */

    public static async CreateSymbolicLink(target: Path, path: Path, type: SymbolicLinkType = SymbolicLinkType.FILE): Promise<void> {
        try {
            await NodeFS.symlink(target.toString(), path.toString(), type.toString());
        }
        catch(e) {
            throw new FileSystemException((e as Error).message);
        }
    }

    /**
     * Delete()
     *
     * Delete a file or directory specified by path.
     * @param path the path to the file or directory to delete.
     * @param force When true, exceptions will be ignored if path does not exist. Defaults to false.
     * @param recursive If true, perform a recursive directory removal. In recursive mode, operations are retried on failure.
     * Defaults to false.
     * @throws FileSystemException when an error occurs completing the operation.
     */

    public static async Delete(path: Path, recursive: boolean = false, force: boolean = false): Promise<void> {
        try {
            await NodeFS.rm(path.toString(), {
                force: force,
                recursive: recursive,
            });
        }
        catch (e) {
            throw new FileSystemException((e as Error).message);
        }
    }

    /**
     * Open()
     *
     * opens a file.
     * @note Do not forget to close the file with file.close() when you are finished working with it to prevent memory leaks
     * and other unexpected behaviors.
     * @param path The path of the file to open.
     * @param flag The flag
     * @param mode the mode to use.
     * @param encoding the file encoding. Defualts to UTF8.
     * @returns The opened file.
     * @throws FileNotFoundException when the file cannot be found.
     * @throws FileSystemException when there is an error completing the operation.
     */

    public static async Open(path: Path, flag: FileOpenFlag = FileOpenFlag.READ_WRITE, mode: FileOpenMode = FileOpenMode.READWRITE, encoding: BufferEncoding = "utf8"): Promise<File> {

        if (!await FileSystem.Contains(path)) {
            throw new FileNotFoundException();
        }

        // Open the file.
        try {
            const handle = await NodeFS.open(path.toString(), flag.toString(), mode);
            return new File(handle, encoding);
        }
        catch(e) {
            throw new FileSystemException((e as Error).message);
        }
    }

    /**
     * Rename()
     *
     * Renames the oldPath to the newPath.
     * @param oldPath the original path
     * @param newPath the new path.
     * @throws FileSystemException when there is an error completing the operation.
     */

    public static async Rename(oldPath: Path, newPath: Path): Promise<void> {
        try {
            await NodeFS.rename(oldPath.toString(), newPath.toString());
        }
        catch(e) {
            throw new FileSystemException((e as Error).message);
        }
    }

    /**
     * RemoveSymbolicLink()
     *
     * removes a symbolic link without affecting the file or directory to which that link refer.
     * @param path the path to the symbolic link to remove.
     * @throws FileSystemException when there is an error completing the operation.
     */

    public static async RemoveSymbolicLink(path: Path): Promise<void> {
        try {
            const stats = await NodeFS.lstat(path.toString(), {
                throwIfNoEntry: true
            });

            if (stats.isSymbolicLink()) {
                await NodeFS.unlink(path.toString());
            }
            else {
                throw new Error("Not a Symbolic Link");
            }
        }
        catch(e) {
            throw new FileSystemException((e as Error).message);
        }
    }
}