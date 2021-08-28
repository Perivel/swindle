import * as NodeFS from 'fs/promises';
import { DateTime, Timezone } from '@swindle/core';
import { FileException } from '../exceptions/exceptions.well';
import { FileStats } from './file-stats.interface';
import { FileInterface } from "./file.interface";

/**
 * File
 *
 * A FileHandle.
 */

export class File implements FileInterface {

    private readonly _handle: NodeFS.FileHandle;
    private readonly _encoding: BufferEncoding;

    constructor(handle: NodeFS.FileHandle, encoding: BufferEncoding) {
        this._handle = handle;
        this._encoding = encoding;
    }

    /**
     * append()
     *
     * writes data to a file, replacing the file if it already exists.
     * @param data The data to append.
     * @throws FileException when there is an error appending the file.
     */

    public async append(data: string | Uint8Array): Promise<void> {
        try {
            await this._handle.appendFile(data, {
                encoding: this.encoding(),
            });
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * chmod()
     *
     * Modifies the permissions on the file
     * @param mode the mode to set.
     * @throws FileException when there is an error completing the operation.
     */

    public async chmod(mode: number | string): Promise<void> {
        try {
            await this._handle.chmod(mode);
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * chown()
     *
     * changes the ownership of the file
     * @param uid The file's new user id.
     * @param gid the file's new group id.
     * @throws FileException when there is an error completing the operation.
     */

    public async chown(uid: number, gid: number): Promise<void> {
        try {
            await this._handle.chown(uid, gid);
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * close()
     *
     * closes the file after waiting for any pending operations to complete.
     * @throws FileException when an error occurs completing the operation.
     */

    public async close(): Promise<void> {
        try {
            await this._handle.close();
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * datasync()
     *
     * Forces all currently queued I/O operations associated with the file to the
     * operating system's synchronized I/O completion state.
     * @throws FileException when an error occurs completing the operation.
     */

    public async datasync(): Promise<void> {
        try {
            await this._handle.datasync();
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * decryptor()
     *
     * gets numeric file descriptor
     */

    public decryptor(): number {
        return this._handle.fd;
    }

    public equals(suspect: any): boolean {
        const isEqual = false;

        if (suspect instanceof File) {
            const other = suspect as File;
            this.decryptor() === other.decryptor();

        }

        return isEqual;
    }

    /**
     * encoding()
     *
     * gets the file encoding.
     * @returns the file encoding.
     */

    public encoding(): BufferEncoding {
        return this._encoding;
    }

    /**
     * read()
     *
     * Reads data from the file
     * @param length The number of bytes to read.
     * @param position The location where to begin reading data from the file. If null,
     * data will be read from the current file position, and the position will be updated.
     * If position is an integer, the current file position will remain unchanged.
     * @throws FileException when an error occurs completing the operation.
     * @returns the file contents.
     */

    public async read(length: number|null, position: number | null): Promise<string> {
        try {
            const contents = await this._handle.read({
                length,
                position
            });
            return contents.buffer.toString(this.encoding());
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * readAll()
     *
     * reads the entire contents of a file
     * @throws FileException when an error occurs completing the operation.
     */

    public async readAll(): Promise<string> {
        try {
            return await this._handle.readFile({
                encoding: this.encoding(),
            });
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * stats()
     *
     * gets the stats for the file.
     * @param bigInt Whether the numeric values in the stat should use BigInt
     * @throws FileException when an error occurs completing the operation.
     */

    public async stats(bigInt: boolean = false): Promise<FileStats> {
        try {
            const stats = await this._handle.stat({
                bigint: bigInt,
                throwIfNoEntry: true,
            });

            return {
                dev: stats.dev,
                ino: stats.ino,
                mode: stats.mode,
                nlink: stats.nlink,
                uid: stats.uid,
                gid: stats.gid,
                rdev: stats.rdev,
                size: stats.size,
                blksize: stats.blksize,
                blocks: stats.blocks,
                atimeMs: stats.atimeMs,
                mtimeMs: stats.mtimeMs,
                ctimeMs: stats.ctimeMs,
                birthtimeMs: stats.birthtimeMs,
                atime: DateTime.FromDate(stats.atime, Timezone.UTC()),
                mtime: DateTime.FromDate(stats.mtime, Timezone.UTC()),
                ctime: DateTime.FromDate(stats.ctime, Timezone.UTC()),
                birthtime: DateTime.FromDate(stats.birthtime, Timezone.UTC()),
                isBlockDevice: stats.isBlockDevice(),
                isCharacterDevice: stats.isCharacterDevice(),
                isDirectory: stats.isDirectory(),
                isFIFO: stats.isFIFO(),
                isFile: stats.isFile(),
                isSocket: stats.isSocket(),
                isSymbolicLink: stats.isSymbolicLink()
            } as FileStats
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * sync()
     *
     * request that all data for the open file descriptor is flushed to the storage device.
     * @throws FileException when the operation fails.
     */

    public async sync(): Promise<void> {
        try {
            await this._handle.sync();
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * utimes()
     *
     * change the file system timestamps
     * @throws FileException when an error occurs completing the operation.
     */

    public async utimes(atime: DateTime, mtime: DateTime): Promise<void> {
        try {
            await this._handle.utimes(atime.value(), mtime.value());
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

    /**
     * writeBuffer()
     *
     * writes the bufer to the file.
     * @param buffer the data to write.
     * @param offset the start position from within buffer where the data to write begins
     * @param length the number of bytes from buffer to write
     * @param position the offset from the beginning of the file where the data from buffer should be written
     * @throws FileException when an error occurs completing the operation.
     */

    public async writeBuffer(buffer: Buffer, offset: number = 0, length: number = buffer.byteLength, position: number|null = null): Promise<void> {
        try {
            await this._handle.write(buffer, offset, length, position);
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }

     /**
      * writeString()
      *
      * writes the string data to a file.
      * @param datathe data to write.
      * @param position  the offset from the beginning of the file where the data from string should
      * be written
      * @throws FileException when an error occurs completing the operation.
      */

    public async writeString(str: string|object, position: number|null = null): Promise<void> {
        try {
            await this._handle.write(str.toString(), position, this.encoding());
        }
        catch(e) {
            throw new FileException((e as Error).message);
        }
    }
}