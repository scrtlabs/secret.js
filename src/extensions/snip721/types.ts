export interface ViewerInfo {
  address: string;
  viewing_key: string;
}

export interface Trait {
  /// indicates how a trait should be displayed
  display_type?: string;
  /// name of the trait
  trait_type?: string;
  /// trait value
  value: string;
  /// optional max value for numerical traits
  max_value?: string;
}

export interface Authentication {
  /// either a decryption key for encrypted files or a password for basic authentication
  key?: string;
  /// username used in basic authentication
  user?: string;
}

export interface MediaFile {
  /// file type
  /// Stashh currently uses: "image", "video", "audio", "text", "font", "application"
  file_type?: string;
  /// file extension
  extension?: string;
  /// authentication information
  authentication?: Authentication;
  /// url to the file.  Urls should be prefixed with `http://`, `https://`, `ipfs://`, or `ar://`
  url: string;
}

export interface Extension {
  image?: string;
  /// raw SVG image data (not recommended). Only use this if you're not including the image parameter
  image_data?: string;
  /// url to allow users to view the item on your site
  external_url?: string;
  /// item description
  description?: string;
  /// name of the item
  name?: string;
  /// item attributes
  attributes?: Trait[];
  /// background color represented as a six-character hexadecimal without a pre-pended #
  // background_color: Option<String>,
  /// url to a multimedia attachment
  //   animation_url: Option<String>,
  /// url to a YouTube video
  //     youtube_url: Option<String>,
  /// media files as specified on Stashh that allows for basic authenticatiion and decryption keys.
  /// Most of the above is used for bridging lic eth NFT metadata easily, whereas `media` will be used
  /// when minting NFTs on Stashh
  media?: MediaFile[];
  /// a select list of trait_types that are in the private metadata.  This will only ever be used
  /// in lic metadata
  protected_attributes: string[];
}

export interface Metadata {
  /// optional uri for off-chain metadata.  This should be prefixed with `http://`, `https://`, `ipfs://`, or
  /// `ar://`.  Only use this if you are not using `extension`
  token_uri?: string;
  /// optional on-chain metadata.  Only use this if you are not using `token_uri`
  extension?: Extension;
}

export interface Snip721SendOptions {
  send_nft: {
    contract: string;
    token_id: string;
    msg?: object;
    memo?: string;
    receiver_info?: {
      recipient_code_hash: string;
      also_implements_batch_receive_nft?: boolean;
    };
  };
}

export interface Snip721AddMinterOptions {
  add_minters: {
    minters: string[];
  };
}

export interface Snip721MintOptions {
  mint_nft: {
    token_id?: string;
    owner?: string;
    public_metadata?: Metadata;
    private_metadata?: Metadata;
    serial_number?: string;
    memo?: string;
    royalty_info?: RoyaltyInfo;
  };
}

interface RoyaltyInfo {
  decimal_places_in_rates: string;
  royalties: Royalty[];
}

interface Royalty {
  recipient: string;
  rate: number;
}
