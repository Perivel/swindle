"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
const NodeFS = __importStar(require("fs/promises"));
const constants_well_1 = require("../constants/constants.well");
const exceptions_well_1 = require("../exceptions/exceptions.well");
const file_1 = require("./../file/file");
/**
 * FileSystem
 *
 * A class abstracting FileSystem operations.
 */
class FileSystem {
    constructor() { }
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
    static async Access(path, mode = constants_well_1.FileAccessMode.F_OK) {
        try {
            await NodeFS.access(path.toString(), mode);
        }
        catch (e) {
            throw new exceptions_well_1.FileSystemException(e.message);
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
    static async ChangeSymbolicLinkOwner(path, uid, gid) {
        try {
            await NodeFS.lchown(path.toString(), uid, gid);
        }
        catch (e) {
            throw new exceptions_well_1.FileSystemException(e.message);
        }
    }
    /**
     * Contains()
     *
     * Determines if a file or directory exists in the given path.
     * @param path The path to the file or directory.
     * @returns TRUE if the file exists. FALSE otherwise.
     */
    static async Contains(path) {
        try {
            await NodeFS.access(path.toString());
            return true;
        }
        catch (e) {
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
    static async CopyFile(source, destination, createDirIfNotExists = false, mode = null) {
        // make sure the file exists.
        if (!await FileSystem.Contains(source)) {
            throw new exceptions_well_1.FileNotFoundException();
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
            throw new exceptions_well_1.DirectoryNotFoundException("Destination Directory not found.");
        }
        // copy the file.
        try {
            const mod = mode !== null ? mode : 0;
            await NodeFS.copyFile(source.toString(), destination.toString(), mod);
        }
        catch (e) {
            throw new exceptions_well_1.FileSystemException(e.message);
        }
    }
    /**
     * CreateDirectory()
     *
     * creates a directory.
     * @param path the path of the directory to create.
     * @throws FileSystemException when there is an error completing the operation
     */
    static async CreateDirectory(path) {
        try {
            await NodeFS.mkdir(path.toString(), {
                recursive: true
            });
        }
        catch (e) {
            throw new exceptions_well_1.FileSystemException(e.message);
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
    static async CreateFile(path, createDirectoryIfNotExists = false) {
        // make sure the path is available.
        if (await FileSystem.Contains(path)) {
            throw new exceptions_well_1.FileAlreadyExistsException();
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
                throw new exceptions_well_1.DirectoryNotFoundException(`Directory ${pathDir.toString()} not found`);
            }
        }
        // create the file.
        try {
            await NodeFS.writeFile(path.toString(), "");
        }
        catch (e) {
            throw new exceptions_well_1.FileAlreadyExistsException();
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
    static async CreateLink(existingPath, newPath) {
        try {
            await NodeFS.link(existingPath.toString(), newPath.toString());
        }
        catch (e) {
            throw new exceptions_well_1.FileSystemException(e.message);
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
    static async CreateSymbolicLink(target, path, type = constants_well_1.SymbolicLinkType.FILE) {
        try {
            await NodeFS.symlink(target.toString(), path.toString(), type.toString());
        }
        catch (e) {
            throw new exceptions_well_1.FileSystemException(e.message);
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
    static async Delete(path, recursive = false, force = false) {
        try {
            await NodeFS.rm(path.toString(), {
                force: force,
                recursive: recursive,
            });
        }
        catch (e) {
            throw new exceptions_well_1.FileSystemException(e.message);
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
    static async Open(path, flag = constants_well_1.FileOpenFlag.READ_WRITE, mode = constants_well_1.FileOpenMode.READWRITE, encoding = "utf8") {
        if (!await FileSystem.Contains(path)) {
            throw new exceptions_well_1.FileNotFoundException();
        }
        // Open the file.
        try {
            const handle = await NodeFS.open(path.toString(), flag.toString(), mode);
            return new file_1.File(handle, encoding);
        }
        catch (e) {
            throw new exceptions_well_1.FileSystemException(e.message);
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
    static async Rename(oldPath, newPath) {
        try {
            await NodeFS.rename(oldPath.toString(), newPath.toString());
        }
        catch (e) {
            throw new exceptions_well_1.FileSystemException(e.message);
        }
    }
    /**
     * RemoveSymbolicLink()
     *
     * removes a symbolic link without affecting the file or directory to which that link refer.
     * @param path the path to the symbolic link to remove.
     * @throws FileSystemException when there is an error completing the operation.
     */
    static async RemoveSymbolicLink(path) {
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
        catch (e) {
            throw new exceptions_well_1.FileSystemException(e.message);
        }
    }
}
exports.FileSystem = FileSystem;
//# sourceMappingURL=filesystem.js.map