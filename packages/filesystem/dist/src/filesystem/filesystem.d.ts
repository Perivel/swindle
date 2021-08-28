/// <reference types="node" />
import { FileAccessMode, FileCopyMode, FileOpenFlag, FileOpenMode, SymbolicLinkType } from "../constants/constants.well";
import { Path } from "./../path/path";
import { File } from "./../file/file";
/**
 * FileSystem
 *
 * A class abstracting FileSystem operations.
 */
export declare class FileSystem {
    private constructor();
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
    static Access(path: Path, mode?: FileAccessMode): Promise<void>;
    /**
     * ChangeSymbolicLinkOwner()
     *
     * Changes the ownership on a symbolic link.
     * @param path the path
     * @param uid the user id
     * @param gid the group id.
     * @throws FileSystemException when there is an error completing the operation.
     */
    static ChangeSymbolicLinkOwner(path: Path, uid: number, gid: number): Promise<void>;
    /**
     * Contains()
     *
     * Determines if a file or directory exists in the given path.
     * @param path The path to the file or directory.
     * @returns TRUE if the file exists. FALSE otherwise.
     */
    static Contains(path: Path): Promise<boolean>;
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
    static CopyFile(source: Path, destination: Path, createDirIfNotExists?: boolean, mode?: FileCopyMode | null): Promise<void>;
    /**
     * CreateDirectory()
     *
     * creates a directory.
     * @param path the path of the directory to create.
     * @throws FileSystemException when there is an error completing the operation
     */
    static CreateDirectory(path: Path): Promise<void>;
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
    static CreateFile(path: Path, createDirectoryIfNotExists?: boolean): Promise<void>;
    /**
     * CreateLink()
     *
     * Creates a new (hard) link from the existingPath to the newPath.
     * @param existingPath the existing path from which to create the new link form.
     * @param newPath the new path.
     * @throws FileSystemException when there is an error completing the operation.
     */
    static CreateLink(existingPath: Path, newPath: Path): Promise<void>;
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
    static CreateSymbolicLink(target: Path, path: Path, type?: SymbolicLinkType): Promise<void>;
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
    static Delete(path: Path, recursive?: boolean, force?: boolean): Promise<void>;
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
    static Open(path: Path, flag?: FileOpenFlag, mode?: FileOpenMode, encoding?: BufferEncoding): Promise<File>;
    /**
     * Rename()
     *
     * Renames the oldPath to the newPath.
     * @param oldPath the original path
     * @param newPath the new path.
     * @throws FileSystemException when there is an error completing the operation.
     */
    static Rename(oldPath: Path, newPath: Path): Promise<void>;
    /**
     * RemoveSymbolicLink()
     *
     * removes a symbolic link without affecting the file or directory to which that link refer.
     * @param path the path to the symbolic link to remove.
     * @throws FileSystemException when there is an error completing the operation.
     */
    static RemoveSymbolicLink(path: Path): Promise<void>;
}
//# sourceMappingURL=filesystem.d.ts.map