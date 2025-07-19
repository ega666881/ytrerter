import {Key} from "../../../../core/database/schema";
import {ApiError} from "../../util/api-error.ts";
import {KeyService as NativeKeyService} from "../../../../service/key";

export class KeyService {
  async geyByPermalink(permalink: string): Promise<Key | never> {
    const key: Key | null = await NativeKeyService.getByPermalink(permalink).catch(() => null);

    if (!key) {
      throw new ApiError(400, 'key not found');
    }

    return key
  }
}
